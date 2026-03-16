import { Octokit } from "@octokit/rest"
import * as dotenv from 'dotenv'

dotenv.config()

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export const fetchPullRequestDiff = async (owner: string, repo: string, pull_number: number) : Promise<string> => {
    //Fetch diff here
    
    const { data } = await octokit.rest.pulls.get(
        {
            owner,
            repo,
            pull_number,
            mediaType : { format : 'diff'}
        })

    return data as unknown as string
}

export const postReviewComment = async (owner : string, repo: string, issue_number: number, body : string) : Promise<void> => {
    //Post github review comment

    await octokit.rest.issues.createComment({
        owner, repo, issue_number, body
    })
}

