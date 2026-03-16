import express from 'express'
import * as dotenv from 'dotenv'
import { fetchPullRequestDiff, postReviewComment } from './github.js'
import { reviewCode } from './review.js'

dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.post('/webhook', async (req, res) => {
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

    const prDiff = await fetchPullRequestDiff( 
        req.body.repository.owner.login,
        req.body.repository.name,
        pull_request.number,
    )
    console.log(prDiff)

    const review = await reviewCode(prDiff)

    console.log(review)

    await postReviewComment(
        req.body.repository.owner.login,
        req.body.repository.name,
        pull_request.number,
        review
    )

})


app.listen(port, () => { 
    console.log(`Server Listening on port ${port}...`)
})

