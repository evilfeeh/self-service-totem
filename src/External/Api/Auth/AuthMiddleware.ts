import { Request, Response, NextFunction } from 'express'
import VerifyAuthToken from '../../../UseCases/Auth/verifyAuthToken.usecase'

interface CustomRequest extends Request {
    user?: object
}

export const authMiddleware = (verifyAuthToken: VerifyAuthToken) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.split(' ')[1]

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Authorization denied, no token' })
        }

        try {
            const user = verifyAuthToken.execute(token)
            req.user = user // Attach the verified user info to the request
            next()
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' })
        }
    }
}
