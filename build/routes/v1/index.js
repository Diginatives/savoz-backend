"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apikey_1 = __importDefault(require("../../auth/apikey"));
var auth_1 = __importDefault(require("./access/auth"));
var logout_1 = __importDefault(require("./access/logout"));
var token_1 = __importDefault(require("./access/token"));
var user_1 = __importDefault(require("./profile/user"));
var adminCategory_1 = __importDefault(require("./admin/categories/adminCategory"));
var adminProductCategory_1 = __importDefault(require("./admin/productCategories/adminProductCategory"));
var adminProduct_1 = __importDefault(require("./admin/products/adminProduct"));
var employees_1 = __importDefault(require("./admin/employees/employees"));
// import dashboardLogin from './dashboard/login';
var category_1 = __importDefault(require("./category/category"));
var product_1 = __importDefault(require("./product/product"));
var order_1 = __importDefault(require("./order/order"));
var admin_1 = __importDefault(require("./admin/admin"));
var adminProfile_1 = __importDefault(require("./admin/adminProfile"));
var dashborad_1 = __importDefault(require("./admin/dashborad"));
var router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
router.use('/', apikey_1.default);
/*-------------------------------------------------------------------------*/
//Token Api
router.use('/token', token_1.default);
//Admin Authentication Api's
router.use('/admin', admin_1.default);
//Admin Profile Api's
router.use('/admin', adminProfile_1.default);
//User Authentication Api's
router.use('/auth', auth_1.default);
//User Api's
router.use('/profile', user_1.default);
//Category Api's
router.use('/category', category_1.default);
//Product Api's
router.use('/product', product_1.default);
//Order Api's
router.use('/order', order_1.default);
//Logout Api
router.use('/logout', logout_1.default);
/*-------------------------------------------------------------------------*/
// Below all APIs are related to the admin dashobard
/*-------------------------------------------------------------------------*/
// router.use('/dashboard', dashboardLogin);
router.use('/admin/products', adminProduct_1.default);
router.use('/admin/employees', employees_1.default);
router.use('/admin/categories', adminCategory_1.default);
router.use('/admin/product-categories', adminProductCategory_1.default);
router.use('/admin/dashboard', dashborad_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map