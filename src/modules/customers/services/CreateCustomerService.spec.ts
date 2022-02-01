import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Fernando',
      email: 'fernando@fdoors.com.br',
    });

    expect(customer).toHaveProperty('id');
    expect(customer.name).toEqual('Fernando');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Fernando',
      email: 'fernando@fdoors.com.br',
    });

    expect(
      createCustomer.execute({
        name: 'Fernando',
        email: 'fernando@fdoors.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
