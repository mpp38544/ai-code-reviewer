import { Octokit } from "@octokit/rest"

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



