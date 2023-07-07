"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Logger_1 = __importDefault(require("./core/Logger"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var multer_1 = __importDefault(require("multer"));
var config_1 = require("./config");
require("./database"); // initialize database
var ApiError_1 = require("./core/ApiError");
var v1_1 = __importDefault(require("./routes/v1"));
var utils_1 = require("./function/utils");
var constants_1 = __importDefault(require("./constants/constants"));
var path = require('path');
process.on('uncaughtException', function (e) {
    Logger_1.default.error(e);
});
var app = (0, express_1.default)();
app.set('view engine', 'pug');
app.set('views', 'src/views/mail-templates');
app.get('/verify/:token/:id', function (req, res) {
    var urlApp = (0, utils_1.addBaseURLApp)("auth/reset_password/".concat(req.params.token, "/").concat(req.params.id));
    var urlWeb = (0, utils_1.addBaseURLWeb)("reset-link-user/".concat(req.params.token, "/").concat(req.params.id));
    res.render('redirect-page.pug', { app: urlApp, web: urlWeb });
});
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use((0, cors_1.default)({ origin: config_1.corsUrl, optionsSuccessStatus: 200 }));
// File store
var uploadedFilename = '';
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var ext = (0, utils_1.getFileExtenson)(file.originalname);
        var validExt = ['png', 'jpeg', 'jpg', 'gif', 'pdf', 'doc', 'docx'];
        if (!validExt.includes(ext)) {
        }
        if (req.originalUrl === '/v1/profile/upload_file')
            cb(null, constants_1.default.dirImage);
        if (req.originalUrl === '/v1/admin/upload_profile')
            cb(null, path.join(__dirname + constants_1.default.dirAdminUsers));
        if (req.originalUrl === '/v1/category/sub_category')
            cb(null, constants_1.default.dirSubCategory);
        if (req.originalUrl === '/v1/admin/products/add-product' ||
            req.originalUrl === '/v1/admin/products/update-product' ||
            req.originalUrl === '/v1/admin/products/bulk-upload')
            cb(null, path.join(__dirname + constants_1.default.dirProductImages));
        if (req.originalUrl === '/v1/admin/product-categories/add-product-category' ||
            req.originalUrl === '/v1/admin/product-categories/update' ||
            req.originalUrl === '/v1/admin/product-categories/bulk-upload' ||
            req.originalUrl === '/v1/admin/categories/add-sub-category' ||
            req.originalUrl === '/v1/admin/categories/bulk-upload' ||
            req.originalUrl === '/v1/admin/categories/update-category')
            cb(null, path.join(__dirname + constants_1.default.dirProductCategory));
        if (req.originalUrl === '/v1/admin/employees/upload-profile-image')
            cb(null, path.join(__dirname + constants_1.default.dirAdminUsers));
    },
    filename: function (req, file, cb) {
        var dateVal = Math.floor(Date.now() / 1000) + '-' + Math.floor(Math.random() * 10000000);
        uploadedFilename = dateVal + '-' + file.originalname;
        cb(null, uploadedFilename);
    },
});
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var validType = [
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
app.use('/v1', v1_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) { return next(new ApiError_1.NotFoundError()); });
// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        ApiError_1.ApiError.handle(err, res);
    }
    else {
        if (config_1.environment === 'development') {
            Logger_1.default.error(err);
            return res.status(500).send(err.message);
        }
        ApiError_1.ApiError.handle(new ApiError_1.InternalError(), res);
    }
});
app
    .listen(config_1.port, function () {
    console.log("server running on port : ".concat(config_1.port));
    Logger_1.default.info("server running on port : ".concat(config_1.port));
})
    .on('error', function (e) { return Logger_1.default.error(e); });
exports.default = app;
//# sourceMappingURL=app.js.map