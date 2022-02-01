import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICustomer } from '../../models/ICustomer';

export default class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();
    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;
    this.customers.push(customer);
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(c => c.id === id);
    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(c => c.name === name);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(c => c.email === email);
    return customer;
  }
  public async findAll(): Promise<Customer[]> {
    return this.customers;
  }
  public async remove({ id }: ICustomer): Promise<void> {
    this.customers = this.customers.filter(c => c.id !== id);
  }
}
