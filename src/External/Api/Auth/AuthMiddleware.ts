import { Request, Response, NextFunction } from 'express'
import VerifyAuthToken from '../../../UseCases/Auth/verifyAuthToken.usecase'
import { UserTypeEnum } from '../../../Entities/Enums/UserTypeEnum'
import { RouteTypeEnum } from '../../../Entities/Enums/RouteType'

export const authMiddleware = (verifyAuthToken: VerifyAuthToken) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const path = req.path
        const token = req.header('token')

        const containsIntegration = path.includes(RouteTypeEnum.INTEGRATION)

        if (containsIntegration) return next()

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Authorization denied, no token' })
        }

        const containsPublic = path.includes(RouteTypeEnum.PUBLIC)
        const containsProtected = path.includes(RouteTypeEnum.PROTECTED)

        try {
            if (containsPublic) return next()

            const userAuth = verifyAuthToken.execute(token)

            if (userAuth.getType() === UserTypeEnum.ADMIN) return next()

            if (
                userAuth.getType() === UserTypeEnum.UNREGISTERED &&
                !containsProtected
            ) {
                req.body = { ...req.body, user_name: userAuth.getName() }
                return next()
            }

            if (
                userAuth.getType() === UserTypeEnum.REGISTERED &&
                !containsProtected
            ) {
                req.body = {
                    ...req.body,
                    user_name: userAuth.getName(),
                    cpf: userAuth.getCpf(),
                }
                return next()
            }
            res.status(403).json({
                message: 'You dont have auth rights for this route.',
            })
        } catch (err) {
            console.log('🚀 ~ return ~ err:', err)
            res.status(401).json({ message: 'Token is not valid' })
        }
    }
}
