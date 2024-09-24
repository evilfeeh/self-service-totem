export default class AuthToken {
    private readonly userId: string
    private readonly username: string
    private readonly expiresAt: Date

    constructor(userId: string, username: string, expiresAt: Date) {
        this.userId = userId
        this.username = username
        this.expiresAt = expiresAt
    }

    getUserId(): string {
        return this.userId
    }

    getUsername(): string {
        return this.username
    }

    getExpiresAt(): Date {
        return this.expiresAt
    }
}
