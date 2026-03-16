import crypto from 'crypto'

export const verifyGithubSignature = (signature: string, rawBody: string, secret: string) : boolean => {

    const cleanSig = signature.replace('sha256=', '')

    const hash = crypto.createHmac(
        'sha256',
        secret
    ).update(rawBody).digest('hex')

    return (crypto.timingSafeEqual(
        Buffer.from(hash),
        Buffer.from(cleanSig)))
}