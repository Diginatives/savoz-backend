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
var Employee_1 = require("../../model//admin/Employee");
var KeystoreRepo_1 = __importDefault(require("../KeystoreRepo"));
var index_1 = require("../../index");
var roles_1 = __importDefault(require("../../../constants/roles"));
var AdminUserRepo = /** @class */ (function () {
    function AdminUserRepo() {
    }
    AdminUserRepo.searchCondition = function (roleId, searchTerm) {
        var condition = '';
        if (roleId != '' && searchTerm != '') {
            condition = "".concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.roleId, "='").concat(roleId, "' \n      AND CONCAT( ").concat(Employee_1.EMPLOYEE_TABLE_COL.firstName, ",  ' ', ").concat(Employee_1.EMPLOYEE_TABLE_COL.lastName, " ) LIKE '%").concat(searchTerm, "%' OR (").concat(Employee_1.EMPLOYEE_TABLE_COL.firstName, " LIKE '%").concat(searchTerm, "%' OR ").concat(Employee_1.EMPLOYEE_TABLE_COL.lastName, " LIKE '%").concat(searchTerm, "%')");
        }
        else if (roleId != '' && searchTerm === '') {
            condition = "".concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.roleId, "='").concat(roleId, "'");
        }
        else if (roleId == '' && searchTerm !== '') {
            condition = "CONCAT( ".concat(Employee_1.EMPLOYEE_TABLE_COL.firstName, ",  ' ', ").concat(Employee_1.EMPLOYEE_TABLE_COL.lastName, " ) LIKE '%").concat(searchTerm, "%' OR (").concat(Employee_1.EMPLOYEE_TABLE_COL.firstName, " LIKE '%").concat(searchTerm, "%' OR ").concat(Employee_1.EMPLOYEE_TABLE_COL.lastName, " LIKE '%").concat(searchTerm, "%')");
        }
        return condition;
    };
    AdminUserRepo.findById = function (id) {
        return (0, index_1.executeQuery)("Select * from ".concat(Employee_1.EMPLOYEE_TABLE_NAME, " where id='").concat(id, "'"));
    };
    AdminUserRepo.findByEmail = function (email) {
        return (0, index_1.executeQuery)("Select * from ".concat(Employee_1.EMPLOYEE_TABLE_NAME, " where email='").concat(email, "'"));
    };
    AdminUserRepo.adminUserCount = function (storeId) {
        return (0, index_1.executeQuery)("SELECT COUNT(*) as rowCount FROM ".concat(Employee_1.EMPLOYEE_TABLE_NAME, " \n      WHERE ").concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.roleId, "!=1\n      AND ").concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.storeId, " = ").concat(storeId));
    };
    AdminUserRepo.getAllEmployees = function (storeId, limit, offSet) {
        return (0, index_1.executeQuery)("SELECT * FROM ".concat(Employee_1.EMPLOYEE_TABLE_NAME, " \n    WHERE ").concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.roleId, " != 1 \n    AND ").concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.storeId, " = ").concat(storeId, "\n    ORDER BY ").concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.firstName, " ASC\n    LIMIT ").concat(limit, " OFFSET ").concat(offSet));
    };
    AdminUserRepo.employeesCountBySearch = function (userRole, searchTerm, storeId) {
        var condition = this.searchCondition(userRole, searchTerm);
        return (0, index_1.executeQuery)("SELECT COUNT(*) as rowCount FROM ".concat(Employee_1.EMPLOYEE_TABLE_NAME, " \n      WHERE ").concat(condition, "\n      AND ").concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.storeId, " = ").concat(storeId, "\n      AND ").concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.roleId, "!=1"));
    };
    AdminUserRepo.employeesBySearch = function (userRole, storeId, searchTerm, limit, offSet) {
        var condition = this.searchCondition(userRole, searchTerm);
        return (0, index_1.executeQuery)("SELECT * FROM ".concat(Employee_1.EMPLOYEE_TABLE_NAME, " \n    WHERE ").concat(condition, " \n    AND ").concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.roleId, " != 1 \n    AND ").concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.storeId, " = ").concat(storeId, "\n    ORDER BY ").concat(Employee_1.EMPLOYEE_TABLE_NAME, ".").concat(Employee_1.EMPLOYEE_TABLE_COL.firstName, " ASC\n    LIMIT ").concat(limit, " OFFSET ").concat(offSet));
    };
    AdminUserRepo.deleteEmployee = function (id) {
        return (0, index_1.executeQuery)("DELETE FROM ".concat(Employee_1.EMPLOYEE_TABLE_NAME, " WHERE id=").concat(id));
    };
    AdminUserRepo.updateEmployee = function (id, employeeData) {
        return (0, index_1.updateRecord)("UPDATE ".concat(Employee_1.EMPLOYEE_TABLE_NAME, " \n      SET title=?,firstName=?,lastName=?,email=?,isActive=?,roleId=?,storeId=?,phone=?,profileImage=?,updatedAt=?\n      WHERE id='").concat(id, "'"), employeeData);
    };
    AdminUserRepo.create = function (adminUser, accessTokenKey, refreshTokenKey) {
        return __awaiter(this, void 0, void 0, function () {
            var now, res, keystore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        return [4 /*yield*/, (0, index_1.insertRecord)(Employee_1.EMPLOYEE_TABLE_NAME, {
                                title: "".concat(adminUser.firstName, "  ").concat(adminUser.lastName),
                                firstName: adminUser.firstName,
                                lastName: adminUser.lastName,
                                email: adminUser.email,
                                password: adminUser.password,
                                roleId: adminUser.roleId,
                                storeId: adminUser.storeId,
                                isActive: adminUser.isActive,
                                profileImage: adminUser.profileImage,
                                phone: adminUser.phone,
                                createdAt: now,
                                updatedAt: now,
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, KeystoreRepo_1.default.create(res.id, roles_1.default.EMPLOYEE, accessTokenKey, refreshTokenKey)];
                    case 2:
                        keystore = _a.sent();
                        return [2 /*return*/, { adminUser: res, keystore: keystore }];
                }
            });
        });
    };
    return AdminUserRepo;
}());
exports.default = AdminUserRepo;
//# sourceMappingURL=AdminUserRepo.js.map