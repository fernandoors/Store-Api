import hashPassowrd from '@config/hashPassword';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { classToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateProfileService {
  public async execute(request: IRequest): Promise<User> {
    const { user_id, name, email, password, old_password } = request;
    const usersRepository = getCustomRepository(UsersRepository);

    let user = await usersRepository.findById(user_id);

    user = this.userExists(user);

    const userUpdateEmail = await usersRepository.findByEmail(email);

    this.isEmailUsedByAnotherAccount(userUpdateEmail, user_id);
    this.oldAndNewPasswordsExists(password, old_password);

    if (!!password && !!old_password) {
      this.isPasswordEqualOldPassword(password, old_password);

      const checkOldPassword = await compare(old_password, user?.password);
      if (!checkOldPassword) {
        throw new AppError('Password invalid');
      }
      user.password = await hashPassowrd(password);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return classToClass(user);
  }
  private userExists(user: User | undefined): User {
    if (!user) {
      throw new AppError('User not found');
    }
    return user;
  }
  private isEmailUsedByAnotherAccount(
    useByEmail: User | undefined,
    user_id: string,
  ): void {
    if (useByEmail && useByEmail.id !== user_id) {
      throw new AppError('E-mail invalid');
    }
  }
  private oldAndNewPasswordsExists(password?: string, oldPassword?: string) {
    if (password && !oldPassword) {
      throw new AppError('Password invalid.');
    }
  }
  private isPasswordEqualOldPassword(
    newPassword: string,
    oldPassword: string,
  ): void {
    if (newPassword === oldPassword) {
      throw new AppError('New Password and Old password cannot be the same.');
    }
  }
}
