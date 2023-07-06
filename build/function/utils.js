"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreId = exports.base64FileHeaderMapper = exports.orderDataBy = exports.getDataBy = exports.fixedPrice = exports.transferAmountForStripe = exports.getHomeForImage = exports.getHomeUrl = exports.unLinkFile = exports.addBaseURLWeb = exports.addBaseURLApp = exports.getPaginationObject = exports.getPaginationParams = exports.getAdminPaginationParams = exports.getFileExtenson = exports.getEnvKey = void 0;
var fs = require('fs');
var config_1 = __importDefault(require("config"));
var getEnvKey = function (key) {
    var envValue = process.env.NODE_ENV || 'development';
    var dbValues = config_1.default.get(envValue);
    return dbValues.get(key);
};
exports.getEnvKey = getEnvKey;
var getFileExtenson = function (fileName) {
    if (fileName) {
        return fileName.split('.').pop();
    }
    return 'invalid';
};
exports.getFileExtenson = getFileExtenson;
var getAdminPaginationParams = function (req) {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 20;
    var offSet = page > 1 ? (page - 1) * limit : 0;
    return { page: page, limit: limit, offSet: offSet };
};
exports.getAdminPaginationParams = getAdminPaginationParams;
var getPaginationParams = function (req) {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;
    var offSet = page > 1 ? (page - 1) * limit : 0;
    return { page: page, limit: limit, offSet: offSet };
};
exports.getPaginationParams = getPaginationParams;
var getPaginationObject = function (page, countTotal, limit) {
    var totalPages = Math.ceil(countTotal / limit);
    var nextPage = 0;
    var prevPage = -1;
    if (page * limit < countTotal) {
        nextPage = +page + 1;
    }
    else if (page * limit === countTotal) {
        nextPage = 0;
    }
    else if (page * limit > countTotal) {
        nextPage = 0;
    }
    return {
        page: page,
        limit: limit,
        prevPage: prevPage,
        nextPage: nextPage,
        totalPages: totalPages === 0 ? 1 : totalPages,
        totalCount: countTotal,
    };
};
exports.getPaginationObject = getPaginationObject;
var addBaseURLApp = function (url) {
    var envValue = process.env.NODE_ENV || 'development';
    if (envValue === 'development') {
        return "savoz://app/v1/".concat(url);
    }
    return "savoz://app/v1/".concat(url);
};
exports.addBaseURLApp = addBaseURLApp;
var addBaseURLWeb = function (url) {
    var envValue = process.env.NODE_ENV || 'development';
    if (envValue === 'development') {
        return "https://laughing-jones-c6f0c1.netlify.app/".concat(url);
    }
    return "https://laughing-jones-c6f0c1.netlify.app/".concat(url);
};
exports.addBaseURLWeb = addBaseURLWeb;
var unLinkFile = function (directory, url) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!url)
                    return [2 /*return*/, ''];
                return [4 /*yield*/, fs.unlinkSync("".concat(directory).concat(url))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.unLinkFile = unLinkFile;
// https://api.savoz.pk/v1/admin/employees/get-employees?page=1
var getHomeUrl = function (url) {
    var envValue = process.env.NODE_ENV || 'development';
    if (envValue === 'development') {
        return "https://api.savoz.pk/savoz-backend/".concat(url);
    }
    return "https://api.savoz.pk/savoz-backend/".concat(url);
};
exports.getHomeUrl = getHomeUrl;
var getHomeForImage = function (url) {
    var envValue = process.env.NODE_ENV || 'development';
    if (envValue === 'development') {
        return "https://api.savoz.pk/".concat(url);
    }
    return "https://api.savoz.pk/".concat(url);
};
exports.getHomeForImage = getHomeForImage;
var transferAmountForStripe = function (rate) {
    if (rate.indexOf('.') !== -1) {
        rate = rate.replace('.', '');
    }
    else {
        rate = "".concat(rate, "00");
    }
    return parseInt("".concat(rate));
};
exports.transferAmountForStripe = transferAmountForStripe;
var fixedPrice = function (price) {
    if (!isNaN(price)) {
        return Number(price.toFixed(2));
    }
    return 0;
};
exports.fixedPrice = fixedPrice;
var getDataBy = function (option) {
    var groupBy = 'DAYNAME';
    if (option === 30) {
        groupBy = 'WEEK';
    }
    else if (option === 365) {
        groupBy = 'MONTHNAME';
    }
    return groupBy;
};
exports.getDataBy = getDataBy;
var orderDataBy = function (option) {
    var orderBy = 'WEEKDAY';
    if (option === 30) {
        orderBy = 'WEEK';
    }
    else if (option === 365) {
        orderBy = 'MONTH';
    }
    return orderBy;
};
exports.orderDataBy = orderDataBy;
var base64FileHeaderMapper = function (fileBase64) {
    var fileHeader = new Map();
    fileHeader.set('/9j', 'JPG');
    fileHeader.set('iVB', 'PNG');
    fileHeader.set('Qk0', 'BMP');
    fileHeader.set('SUk', 'TIFF');
    fileHeader.set('JVB', 'PDF');
    fileHeader.set('UEs', 'OFD');
    var res = '';
    fileHeader.forEach(function (v, k) {
        if (k === fileBase64.substr(0, 3)) {
            res = v;
        }
    });
    if (res === '') {
        res = 'unknown file';
    }
    return res;
};
exports.base64FileHeaderMapper = base64FileHeaderMapper;
var getStoreId = function (type) {
    if (type === 24)
        return 1;
    else
        return 2;
};
exports.getStoreId = getStoreId;
//# sourceMappingURL=utils.js.map