import Customer from "../../Entities/Customer";

export default interface ICustomerService {
  saveOrUpdate() : Promise<void>;
  delete(): Promise<void>;
  findByCpf(cpf: string): Promise<void>;
}