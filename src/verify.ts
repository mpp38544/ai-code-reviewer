import crypto from 'crypto'

export const verifyGithubSignature = (signature: string, rawBody: string, secret: string) : boolean => {
    console.log('Secret length:', secret.length)
    console.log('Signature received:', signature)
    
    const cleanSig = signature.replace('sha256=', '')

    const hash = crypto.createHmac(
        'sha256',
        secret
    ).update(rawBody).digest('hex')

    return (crypto.timingSafeEqual(
        Buffer.from(hash),
        Buffer.from(cleanSig)))

    }

