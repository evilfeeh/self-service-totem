import Customer from "../../Entities/Customer";

export default interface ICustomerRepository {
  saveOrUpdate(customer: Customer) : Promise<void>;
  delete(cpf: string): Promise<void>;
  findByCpf(cpf: string): Promise<Customer | undefined>;
}