import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showOrder = new ShowOrderService();
    const { id } = request.params;

    const order = await showOrder.execute({ id });

    return response.json(order);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const createOrder = new CreateOrderService();
    const { customer_id, products } = request.body;

    const order = await createOrder.execute({ customer_id, products });

    return response.json(order);
  }
}
