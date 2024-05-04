export default class CpfNotFoundException extends Error{
  constructor(message: string = "CPF Not Found") {
    super(message);
    this.name = "CpfNotFoundException";
  }
}