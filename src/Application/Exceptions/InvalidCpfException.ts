export default class InvalidCpfException extends Error {
  constructor(message: string = "Invalid Cpf") {
    super(message);
    this.name = "InvalidCpfException";
  }
}