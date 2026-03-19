import express from 'express'
import * as dotenv from 'dotenv'
import { fetchPullRequestDiff, postReviewComment } from './github.js'
import { reviewCode } from './review.js'
import { verifyGithubSignature } from './verify.js'
import { intialiseDatabase, saveReview, getReviews, getStats } from './db.js' 
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config();


(async () => {
    await intialiseDatabase()
})().catch(console.error)

const app = express()

const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json({
    verify: (req, res, buf) => {
        (req as any).rawBody = buf.toString()
    }
}))

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log('Static path:', join(__dirname, '../client/dist'))

app.use(express.static(join(__dirname, '../client/dist')))

app.post('/webhook', async (req, res) => {
    if (!verifyGithubSignature(req.headers['x-hub-signature-256'] as string, req.rawBody ?? '', process.env.GITHUB_WEBHOOK_SECRET ?? '')) {
        res.status(401).json({message : 'Invalid signature'})
        return
    }

    if (req.headers['x-github-event'] !== 'pull_request') {
        res.status(200).json({ message : 'ignored'})
        return
    }
    
    const action_type = req.body.action
    
    if (action_type !== 'opened' && action_type !== 'synchronize') {
        res.status(200).json({ message : 'ignored'})
        return
    }
    res.status(200).json({message: 'ok'})

    const pull_request = req.body.pull_request

    console.log(`Pull Request Title: ${pull_request.title}`)

    const owner = req.body.repository.owner.login
    const repo = req.body.repository.name
    const pull_request_number = pull_request.number
    const title = pull_request.title

    const prDiff = await fetchPullRequestDiff( 
        owner,
        repo,
        pull_request_number
    )
    console.log(prDiff)

    const review = await reviewCode(prDiff)

    console.log(review)

    await postReviewComment(
        owner, repo, pull_request_number, review
    )

    await saveReview(
        repo, pull_request_number, title, prDiff, review
    )
})


app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await getReviews(req.query.repo as string)
        res.status(200).json(reviews)
    } catch (err) {
        res.status(500).json({ message : 'Failed to fetch reviews'})
    }
})


app.get('/api/stats', async (req, res) => {
    try {
        const stats = await getStats()
        res.status(200).json(stats)
    } catch (err) {
        res.status(500).json({ message : 'Failed to fetch stats'})
    }
})

app.get('/{*splat}', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'))
})

app.listen(port, () => { 
    console.log(`Server Listening on port ${port}...`)
})
