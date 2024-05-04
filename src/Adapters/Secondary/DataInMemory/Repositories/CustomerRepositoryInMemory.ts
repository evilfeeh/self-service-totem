import Customer from "../../../../Application/Entities/Customer";
import ICustomerRepository from "../../../../Application/Ports/Secondary/ICustomerRepository";

type CustomerType = {
  name: string,
  email: string | undefined,
  cpf: string | undefined,
}

export default class CustomerRepositoryInMemory implements ICustomerRepository{
  private list: CustomerType[];

  constructor(){
    this.list  = [];
  }  

  async saveOrUpdate(customer: Customer): Promise<void> {
    const existingCustomerIndex = this.list.findIndex(customerFind => customerFind.cpf === customer.getCpf());
    
    if (existingCustomerIndex !== -1) {      
      this.list[existingCustomerIndex] = {
        name: customer.getName(),
        cpf: customer.getCpf(),
        email: customer.getEmail()
      };
    } else {
      this.list.push({
        name: customer.getName(),
        cpf: customer.getCpf(),
        email: customer.getEmail()
      });
    }
  }

  async findByCpf(cpf: string): Promise<Customer | undefined> {  
    let customer = undefined;  
    const customerSaved = this.list.find(customerFind => customerFind.cpf === cpf);
    
    if (customerSaved) {
      customer = new Customer(customerSaved.name, this);

      if (customerSaved.cpf) customer.setCpf(customerSaved.cpf);
      if (customerSaved.email) customer.setEmail(customerSaved.email);
    }

    return customer;    
  }

  async delete(cpf: string): Promise<void> {
    const existingCustomerIndex = this.list.findIndex(customerFind => customerFind.cpf === cpf);
    
    if (existingCustomerIndex !== -1) {
      this.list.splice(existingCustomerIndex, 1);
    }
  }
}