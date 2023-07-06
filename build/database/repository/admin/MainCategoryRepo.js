"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainCategory_1 = require("../../model/admin/MainCategory");
var index_1 = require("../../index");
var MainCategoryRepo = /** @class */ (function () {
    function MainCategoryRepo() {
    }
    MainCategoryRepo.findByName = function (name) {
        return (0, index_1.executeQuery)("SELECT * FROM ".concat(MainCategory_1.MAIN_CATEGORY_TABLE_NAME, " \n      WHERE ").concat(MainCategory_1.MAIN_CATEGORY_COL.name, "='").concat(name, "'"));
    };
    return MainCategoryRepo;
}());
exports.default = MainCategoryRepo;
//# sourceMappingURL=MainCategoryRepo.js.map