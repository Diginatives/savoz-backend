import express from 'express';
import apikey from '../../auth/apikey';
import auth from './access/auth';
import logout from './access/logout';
import token from './access/token';
import user from './profile/user';

import adminCategory from './admin/categories/adminCategory';
import adminProductCategory from './admin/productCategories/adminProductCategory';
import adminProduct from './admin/products/adminProduct';
import employees from './admin/employees/employees';
// import dashboardLogin from './dashboard/login';
import category from './category/category';
import product from './product/product';
import order from './order/order';
import admin from './admin/admin';
import adminProfile from './admin/adminProfile';
import dashboard from './admin/dashborad';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
router.use('/', apikey);
/*-------------------------------------------------------------------------*/

//Token Api
router.use('/token', token);

//Admin Authentication Api's
router.use('/admin', admin);

//Admin Profile Api's
router.use('/admin', adminProfile);

//User Authentication Api's
router.use('/auth', auth);

//User Api's
router.use('/profile', user);

//Category Api's
router.use('/category', category);

//Product Api's
router.use('/product', product);

//Order Api's
router.use('/order', order);

//Logout Api
router.use('/logout', logout);

/*-------------------------------------------------------------------------*/
// Below all APIs are related to the admin dashobard
/*-------------------------------------------------------------------------*/
// router.use('/dashboard', dashboardLogin);
router.use('/admin/products', adminProduct);
router.use('/admin/employees', employees);
router.use('/admin/categories', adminCategory);
router.use('/admin/product-categories', adminProductCategory);
router.use('/admin/dashboard', dashboard);

export default router;
