import jwt, { JwtPayload } from 'jsonwebtoken'
import AuthToken from '../../Entities/ValueObjects/AuthToken'

interface CustomJwtPayload extends JwtPayload {
    name: string | null
    type: string
    cpf: string | null
    iat: number
    exp: number
}

export default class VerifyAuthToken {
    constructor(private jwtSecret: string) {}

    execute(token: string): AuthToken {
        try {
            jwt.verify(token, this.jwtSecret)

            const decoded = jwt.decode(token, { complete: true })

            const decodedPayload: CustomJwtPayload =
                decoded?.payload as CustomJwtPayload

            const authToken: AuthToken = new AuthToken(
                decodedPayload.name,
                decodedPayload.type,
                decodedPayload.cpf,
                decodedPayload.iat,
                decodedPayload.exp
            )
            return authToken
        } catch (error) {
            console.log('🚀 ~ VerifyAuthToken ~ execute ~ error:', error)
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Token is expired')
            }
            throw new Error('Invalid token')
        }
    }
}
