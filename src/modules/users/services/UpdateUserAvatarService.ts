import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { classToClass } from 'class-transformer';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import uploadSettings from '@config/upload';
interface IRequest {
  avatarFileName: string;
  user_id: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    let storageProvider = new DiskStorageProvider();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (uploadSettings.driver === 's3') {
      storageProvider = new S3StorageProvider();
    }

    if (user.avatar) {
      storageProvider.deleteFile(user.avatar);
    }

    const filename = await storageProvider.saveFile(avatarFileName);

    user.avatar = filename;
    await usersRepository.save(user);

    return classToClass(user);
  }
}
