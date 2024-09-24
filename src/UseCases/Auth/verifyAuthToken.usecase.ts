import jwt from 'jsonwebtoken'
import AuthToken from '../../Entities/ValueObjects/AuthToken'

export default class VerifyAuthToken {
    constructor(private jwtSecret: string) {}

    execute(token: string): AuthToken {
        try {
            const decoded = jwt.verify(token, this.jwtSecret) as AuthToken
            const decodedToken: AuthToken = new AuthToken(
                decoded.getUserId(),
                decoded.getUsername(),
                decoded.getExpiresAt()
            )
            return decodedToken
        } catch (err) {
            throw new Error('Invalid token')
        }
    }
}
