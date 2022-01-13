import { CustomersRepository } from '@modules/customers/infra/typeorm/repositores/CustomersRepository';
import Product from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import { OrderRepository } from '../infra/typeorm/repositories/OrderRepository';

interface IRequest {
  customer_id: string;
  products: Product[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);
    const orderRepository = getCustomRepository(OrderRepository);

    const customerExists = await customerRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError('Customer does not found');
    }

    const productsExists = await productsRepository.findAllByIds({ products });
    if (!productsExists.length) {
      throw new AppError('Products does not found');
    }

    const productsExistsIds = productsExists.map(product => product.id);

    const checkInexistentsProducts = products.filter(
      product => !productsExistsIds.includes(product.id),
    );

    if (checkInexistentsProducts.length) {
      throw new AppError(
        `Product ${checkInexistentsProducts[0].name} does not found`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        productsExists.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} for the Product ${quantityAvailable[0].id} does not available`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(p => p.id === product.id)[0].price,
    }));

    const order = await orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;
    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        productsExists.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
