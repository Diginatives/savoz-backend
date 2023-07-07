"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Settings_1 = require("../model/Settings");
var index_1 = require("../index");
var SettingsRepo = /** @class */ (function () {
    function SettingsRepo() {
    }
    SettingsRepo.getSettings = function () {
        return (0, index_1.executeQuery)("select * from ".concat(Settings_1.SETTINGS_TABLE_NAME));
    };
    return SettingsRepo;
}());
exports.default = SettingsRepo;
//# sourceMappingURL=SettingsRepo.js.map