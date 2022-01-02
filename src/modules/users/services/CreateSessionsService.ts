import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
}
export default class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password.', 401);
    }
    const isPasswordConfirmed = await this.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordConfirmed) {
      throw new AppError('Incorrect email/password.', 401);
    }

    return { user };
  }

  private async comparePassword(
    bodyPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    const hashedPassword = await compare(bodyPassword, userPassword);
    return hashedPassword;
  }
}
