import express, { Request, Response, NextFunction } from 'express';
import Logger from './core/Logger';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import { corsUrl, environment } from './config';
import './database'; // initialize database
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import routesV1 from './routes/v1';
import { addBaseURLApp, addBaseURLWeb, getFileExtenson } from './function/utils';
import CONSTANTS from './constants/constants';
const path = require('path');

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.set('view engine', 'pug');

app.set('views', 'src/views/mail-templates');

app.get('/verify/:token/:id', (req: any, res: any) => {
  const urlApp = addBaseURLApp(`auth/reset_password/${req.params.token}/${req.params.id}`);
  const urlWeb = addBaseURLWeb(`reset-link-user/${req.params.token}/${req.params.id}`);
  res.render('redirect-page.pug', { app: urlApp, web: urlWeb });
});

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// File store
var uploadedFilename = '';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ext: any = getFileExtenson(file.originalname);
    const validExt: string[] = ['png', 'jpeg', 'jpg', 'gif', 'pdf', 'doc', 'docx'];
    if (!validExt.includes(ext)) {
    }
    if (req.originalUrl === '/v1/profile/upload_file') cb(null, CONSTANTS.dirImage);
    if (req.originalUrl === '/v1/admin/upload_profile')
      cb(null, path.join(__dirname + CONSTANTS.dirAdminUsers));
    if (req.originalUrl === '/v1/category/sub_category') cb(null, CONSTANTS.dirSubCategory);
    if (
      req.originalUrl === '/v1/admin/products/add-product' ||
      req.originalUrl === '/v1/admin/products/update-product' ||
      req.originalUrl === '/v1/admin/products/bulk-upload'
    )
      cb(null, path.join(__dirname + CONSTANTS.dirProductImages));
    if (
      req.originalUrl === '/v1/admin/product-categories/add-product-category' ||
      req.originalUrl === '/v1/admin/product-categories/update' ||
      req.originalUrl === '/v1/admin/product-categories/bulk-upload' ||
      req.originalUrl === '/v1/admin/categories/add-sub-category' ||
      req.originalUrl === '/v1/admin/categories/bulk-upload' ||
      req.originalUrl === '/v1/admin/categories/update-category'
    )
      cb(null, path.join(__dirname + CONSTANTS.dirProductCategory));
    if (req.originalUrl === '/v1/admin/employees/upload-profile-image')
      cb(null, path.join(__dirname + CONSTANTS.dirAdminUsers));
  },
  filename: function (req, file, cb) {
    var dateVal = Math.floor(Date.now() / 1000) + '-' + Math.floor(Math.random() * 10000000);
    uploadedFilename = dateVal + '-' + file.originalname;
    cb(null, uploadedFilename);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const validType = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'text/csv',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    if (!validType.includes(file.mimetype)) {
      cb(null, false);
      return cb(new Error('file is not allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 },
});

app.use(upload.any());
// Routes
app.use('/v1', routesV1);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
      Logger.error(err);
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
