"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiAuthBearer = exports.JoiUrlEndpoint = exports.JoiObjectId = exports.ValidationSource = void 0;
var joi_1 = __importDefault(require("@hapi/joi"));
var Logger_1 = __importDefault(require("../core/Logger"));
var utils_1 = require("../function/utils");
var constants_1 = __importDefault(require("../constants/constants"));
var ApiResponse_1 = require("../core/ApiResponse");
var ValidationSource;
(function (ValidationSource) {
    ValidationSource["FILE"] = "files";
    ValidationSource["BODY"] = "body";
    ValidationSource["HEADER"] = "headers";
    ValidationSource["QUERY"] = "query";
    ValidationSource["PARAM"] = "params";
})(ValidationSource = exports.ValidationSource || (exports.ValidationSource = {}));
var JoiObjectId = function () {
    return joi_1.default.string().custom(function (value, helpers) {
        if (!value)
            return helpers.error('any.invalid');
        return value;
    }, 'Object Id Validation');
};
exports.JoiObjectId = JoiObjectId;
var JoiUrlEndpoint = function () {
    return joi_1.default.string().custom(function (value, helpers) {
        if (value.includes('://'))
            return helpers.error('any.invalid');
        return value;
    }, 'Url Endpoint Validation');
};
exports.JoiUrlEndpoint = JoiUrlEndpoint;
var JoiAuthBearer = function () {
    return joi_1.default.string().custom(function (value, helpers) {
        if (!value.startsWith('Bearer '))
            return helpers.error('any.invalid');
        if (!value.split(' ')[1])
            return helpers.error('any.invalid');
        return value;
    }, 'Authorization Header Validation');
};
exports.JoiAuthBearer = JoiAuthBearer;
exports.default = (function (schema, source) {
    if (source === void 0) { source = ValidationSource.BODY; }
    return function (req, res, next) {
        try {
            console.log('In Validatiaon check');
            var err = void 0;
            if (source === ValidationSource.FILE) {
                var files = req[source];
                if (!files || files === undefined || files.length <= 0) {
                    next(new ApiResponse_1.BadRequestResponse('file is required').send(res));
                    return;
                }
                if (files[0].fieldname !== 'file') {
                    next(new ApiResponse_1.BadRequestResponse("".concat(files[0].fieldname, " field not allowed")).send(res));
                    return;
                }
                var d = files[0].fieldname;
                var error = schema.validate({ file: d }).error;
                err = error;
            }
            else {
                var error = schema.validate(req[source]).error;
                err = error;
            }
            if (!err)
                return next();
            var details = err.details;
            var message = details.map(function (i) { return i.message.replace(/['"]+/g, ''); }).join(',');
            Logger_1.default.error(message);
            var url = req['files'];
            if (req.originalUrl === '/v1/admin/upload_profile' && err && url && url[0]) {
                (0, utils_1.unLinkFile)(constants_1.default.dirAdminImage, url[0].filename);
            }
            if (req.originalUrl === '/v1/profile/upload_file' && err && url && url[0]) {
                (0, utils_1.unLinkFile)(constants_1.default.dirImage, url[0].filename);
            }
            next(new ApiResponse_1.BadRequestResponse(message).send(res));
        }
        catch (error) {
            console.log('Error ', error);
            next(error);
        }
    };
});
//# sourceMappingURL=validator.js.map