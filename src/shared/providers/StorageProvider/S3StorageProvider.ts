import uploadSettings from '@config/upload';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';

export default class S3StorageProvider {
  private client: S3;
  constructor() {
    this.client = new aws.S3();
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadSettings.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }
    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadSettings.config.aws.bucket,
        Key: file,
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }
  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadSettings.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
