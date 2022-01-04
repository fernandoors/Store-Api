import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import hashPassowrd from '@config/hashPassword';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('This token is invalid');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('This user address does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareTokenDate = addHours(tokenCreatedAt, 2);

    if (isAfter(new Date(), compareTokenDate)) {
      throw new AppError('This token is invalid');
    }

    user.password = await hashPassowrd(password);

    await usersRepository.save(user);
  }
}
