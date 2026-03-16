import { Anthropic } from "@anthropic-ai/sdk/client.js"

export const reviewCode = async (diff: string) : Promise<string> => {
    //Output code prompt
    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    })

    const response = await anthropic.messages.create({
        model : 'claude-sonnet-4-5',
        max_tokens: 1024,
        system: 'You are an expert code reviewer that needs to analyse pull request differences and produce functional suggestions based on the quality of the pull request. Include information about syntax and error fixes, alternative approaches and improvements based on the information given in the pull request difference.',
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