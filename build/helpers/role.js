"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (roleCode) { return function (req, res, next) {
    req.currentRoleCode = roleCode;
    next();
}; });
//# sourceMappingURL=role.js.map