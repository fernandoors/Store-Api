import uploadSettings from '@config/upload';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadSettings.tmpFolder, file),
      path.resolve(uploadSettings.directory, file),
    );
    return file;
  }
  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadSettings.directory, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
