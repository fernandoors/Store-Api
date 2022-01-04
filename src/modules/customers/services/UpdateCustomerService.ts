import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositores/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const emailExists = await customerRepository.findByEmail(email);
    if (emailExists && emailExists.id !== id) {
      throw new AppError('Email already used.');
    }

    customer.email = email;
    customer.name = name;

    await customerRepository.save(customer);

    return customer;
  }
}
