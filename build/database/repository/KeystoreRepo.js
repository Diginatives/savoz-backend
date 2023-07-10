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
Object.defineProperty(exports, "__esModule", { value: true });
var Keystore_1 = require("../model/Keystore");
var index_1 = require("../index");
var KeystoreRepo = /** @class */ (function () {
    function KeystoreRepo() {
    }
    KeystoreRepo.findforKey = function (client, key) {
        return (0, index_1.executeQuery)("select * from ".concat(Keystore_1.KEY_STORE_TABLE_NAME, " where ").concat(Keystore_1.KEY_STORE_COL.client, " = ").concat(client, " and ").concat(Keystore_1.KEY_STORE_COL.primaryKey, " = \"").concat(key, "\""));
    };
    KeystoreRepo.remove = function (id, type) {
        return (0, index_1.executeQuery)("delete from ".concat(Keystore_1.KEY_STORE_TABLE_NAME, " where ").concat(Keystore_1.KEY_STORE_COL.clientType, " = \"").concat(type, "\" and ").concat(Keystore_1.KEY_STORE_COL.id, " = ").concat(id));
    };
    KeystoreRepo.removeByClient = function (userId, type) {
        return (0, index_1.executeQuery)("delete from ".concat(Keystore_1.KEY_STORE_TABLE_NAME, " where ").concat(Keystore_1.KEY_STORE_COL.clientType, " = \"").concat(type, "\" and ").concat(Keystore_1.KEY_STORE_COL.client, " = ").concat(userId));
    };
    KeystoreRepo.find = function (client, clientType, primaryKey, secondaryKey) {
        return (0, index_1.executeQuery)("select * from ".concat(Keystore_1.KEY_STORE_TABLE_NAME, " where ").concat(Keystore_1.KEY_STORE_COL.clientType, " = \"").concat(clientType, "\" and  ").concat(Keystore_1.KEY_STORE_COL.id, " = ").concat(client, " and ").concat(Keystore_1.KEY_STORE_COL.primaryKey, "=").concat(primaryKey, " and ").concat(Keystore_1.KEY_STORE_COL.secondaryKey, "=").concat(secondaryKey));
    };
    KeystoreRepo.create = function (client, clientType, primaryKey, secondaryKey) {
        return __awaiter(this, void 0, void 0, function () {
            var now;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        return [4 /*yield*/, (0, index_1.insertRecord)(Keystore_1.KEY_STORE_TABLE_NAME, {
                                client: client,
                                clientType: clientType,
                                primaryKey: primaryKey,
                                secondaryKey: secondaryKey,
                                createdAt: now,
                                updatedAt: now,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return KeystoreRepo;
}());
exports.default = KeystoreRepo;
//# sourceMappingURL=KeystoreRepo.js.map