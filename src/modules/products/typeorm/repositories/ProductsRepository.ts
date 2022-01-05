import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IProductsAll {
  products: Product[];
}
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({ where: { name } });
    return product;
  }
  public async findAllByIds({ products }: IProductsAll): Promise<Product[]> {
    const productsIds = products.map(product => product.id);
    const existProducts = await this.find({
      where: {
        id: In(productsIds),
      },
    });
    return existProducts;
  }
}
