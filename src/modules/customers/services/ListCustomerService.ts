import { getCustomRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomersRepository } from '../infra/typeorm/repositores/CustomersRepository';

interface ICustomerWithPaginate extends PaginationAwareObject {
  data: Customer[];
}
export default class ListCustomerService {
  public async execute(): Promise<ICustomerWithPaginate> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customers = await customerRepository.createQueryBuilder().paginate();

    return customers;
  }
}
