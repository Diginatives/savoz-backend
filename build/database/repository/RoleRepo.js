"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("../model/Role");
var index_1 = require("../index");
var RoleRepo = /** @class */ (function () {
    function RoleRepo() {
    }
    RoleRepo.findByCode = function (code) {
        return (0, index_1.executeQuery)("select * from ".concat(Role_1.ROLE_TABLE_NAME, " where ").concat(Role_1.ROLE_COL.code, " = ").concat(code));
    };
    RoleRepo.findById = function (id) {
        return (0, index_1.executeQuery)("select * from ".concat(Role_1.ROLE_TABLE_NAME, " where ").concat(Role_1.ROLE_COL.id, " = ").concat(id));
    };
    return RoleRepo;
}());
exports.default = RoleRepo;
//# sourceMappingURL=RoleRepo.js.map