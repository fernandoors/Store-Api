import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService();
    const { name, email, password } = request.body;

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(classToClass(user));
  }
}
