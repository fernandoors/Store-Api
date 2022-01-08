import RedisCache from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    let products = await RedisCache.recover<Product[]>('PRODUCTS_LIST');

    if (!products) {
      products = await productsRepository.find();
      await RedisCache.save<Product[]>('PRODUCTS_LIST', products);
    }

    return products;
  }
}
