export default class AuthToken {
    private readonly name: string | null
    private readonly type: string
    private readonly cpf: string | null
    private readonly iat: number
    private readonly exp: number

    constructor(
        name: string | null,
        type: string,
        cpf: string | null,
        iat: number,
        exp: number
    ) {
        this.name = name
        this.type = type
        this.cpf = cpf
        this.iat = iat
        this.exp = exp
    }

    getName(): string | null {
        return this.name
    }

    getType(): string {
        return this.type
    }

    getCpf(): string | null {
        return this.cpf
    }

    getIat(): number {
        return this.iat
    }

    getExpiresAt(): number {
        return this.exp
    }
}
