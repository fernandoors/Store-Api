import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositores/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ email, name }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customerRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email already used');
    }

    const customer = customerRepository.create({ name, email });

    await customerRepository.save(customer);

    return customer;
  }
}
