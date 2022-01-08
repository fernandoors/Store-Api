import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import path from 'path';
interface IUploadSettings {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: { bucket: string };
  };
}
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

const uploadSettings = {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  directory: uploadFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        callback(null, fileName);
      },
    }),
  },
  config: {
    aws: { bucket: 'api-store-fdoors-lab' },
  },
};

export default uploadSettings as IUploadSettings;
