import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
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

    const token = this.generateToken(user.id);

    return { user, token };
  }

  private generateToken(userId: string): string {
    return sign({}, authConfig.jwt.secret, {
      subject: userId,
      expiresIn: authConfig.jwt.expiresIn,
    });
  }

  private async comparePassword(
    bodyPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    const hashedPassword = await compare(bodyPassword, userPassword);
    return hashedPassword;
  }
}
