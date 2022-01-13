import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../infra/typeorm/repositores/CustomersRepository';

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }
    await customerRepository.remove(customer);
  }
}
