import { Anthropic } from "@anthropic-ai/sdk/client.js"
import * as dotenv from 'dotenv'

dotenv.config()

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

export const reviewCode = async (diff: string) : Promise<string> => {
    //Output code prompt

    const response = await anthropic.messages.create({
        model : 'claude-sonnet-4-5',
        max_tokens: 2048,
        system: `You are an expert code reviewer. Review the provided pull request diff and respond using the following format only:

        ## Summary
        One sentence describing what this PR does.

        ## Issues
        - Only list issues that could cause bugs, security vulnerabilities, performance problems, or significantly hurt readability
        - Maximum 5 bullet points
        - If no real issues exist, write "No significant issues found."

        ## Suggestions
        - Only list meaningful improvements, not stylistic nitpicks
        - Maximum 5 bullet points
        - If no suggestions, write "No suggestions."

        Rules:
        - Be concise. Developers are reading this on a PR
        - If the diff is a trivial or test file with nothing meaningful to review, respond with "No review needed for this change."
        - Never repeat yourself`,
        messages : [{ 
            role : 'user',
            content : `Please review this pull request code diff:\n\n${diff}`
        }]
    })

    if (!response.content.length) throw new Error('Empty response from Anthropic')

    const content = response.content[0]
    if (!content || content.type !== 'text') throw new Error('Unexpected response type')
    return content.text
}