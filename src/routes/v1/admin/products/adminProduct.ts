import express from 'express';
import {
  BadRequestResponse,
  SuccessResponse,
  NotFoundResponse,
  InternalErrorResponse,
} from '../../../../core/ApiResponse';
import ProductRepo from '../../../../database/repository/admin/ProductRepo';
import { ProtectedRequest, PublicRequest } from 'app-request';
import { BadRequestError } from '../../../../core/ApiError';
import asyncHandler from '../../../../helpers/asyncHandler';
import authentication from '../../../../auth/authentication';
import validator, { ValidationSource } from '../../../../helpers/validator';
import schema from './schema';
import { getAdminPaginationParams, getPaginationObject } from '../../../../function/utils';
import {
  customStoreCollectionResponse,
  productsResponse,
  productsCollectionResponse,
} from '../../../../custom/admin-product-responses';
import ProductImage, {
  PRODUCT_IMAGES_TABLE_NAME,
} from '../../../../database/model/admin/ProductImage';
import { updateRecord } from '../../../../database/index';
import ProductImageRepo from '../../../../database/repository/admin/ProductImageRepo';
import CONSTANTS from '../../../../constants/constants';
import ProductCategoryRepo from '../../../../database/repository/admin/ProductCategoryRepo';
import moment from 'moment';
import mysql from 'mysql';

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'savozdb',
});
const fs = require('fs');
const csvToJson = require('csvtojson');

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.post(
  '/add-product',
  validator(schema.productFormData, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const roleId = req['roleId'];
    const {
      productItemName,
      productItemDescription,
      productCategoryId,
      // productStoreId,
      productIsActive,
      productItemExpiry,
      productIsTaxable,
      productTaxPercentage,
      productItemBarCode,
      productPurchasedPrice,
      productQuantity,
      productItemBrand,
      productUnitPrice,
      productComparativePrice,
      productItemSKU,
      productImage,
    } = req.body;

    const productStoreId = roleId === 1 ? 1 : 2;
    const imageName: any = req['files'];
    let imageFile;
    if (imageName && imageName.length > 0) {
      if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
        return new BadRequestResponse('Invalid file type').send(res);
      }
      imageFile = imageName[0].filename;
    } else {
      imageFile = productImage;
    }

    const productAlreadyExist: any = await ProductRepo.findByName(productItemName);
    if (productAlreadyExist && productAlreadyExist.length > 0)
      throw new BadRequestResponse('Product already Exist, Please use a different name.').send(res);

    const now = new Date();
    //const imageFile = imageName[0].filename;
    const obj = {
      productCategoryId: productCategoryId,
      productStoreId: productStoreId,
      productIsTaxable: productIsTaxable,
      productTaxPercentage: productTaxPercentage,
      productItemSKU: productItemSKU,
      productItemBarCode: productItemBarCode,
      productQuantity: productQuantity,
      productItemName: productItemName,
      productItemBrand: productItemBrand,
      productItemDescription: productItemDescription,
      productPurchasedPrice: productPurchasedPrice,
      productUnitPrice: productUnitPrice,
      productComparativePrice: productComparativePrice,
      productIsActive: productIsActive,
      productItemExpiry: productItemExpiry,
      productItemImage: imageFile,
      productCreatedAt: now,
      productUpdatedAt: now,
    };
    const product: any = await ProductRepo.createProduct(obj);
    if (!product || product.length === 0)
      throw new BadRequestResponse('Product not created').send(res);

    let productImageRes: any;
    if (imageFile && imageFile !== '') {
      const productImageData: ProductImage = {
        productId: product.product.id,
        image: imageFile,
      };

      productImageRes = await ProductImageRepo.createProductImage(productImageData);
      if (!productImageRes || productImageRes.length === 0)
        throw new BadRequestResponse('Product image not saved').send(res);
    }
    return new SuccessResponse('Product successfully created', [product, productImageRes]).send(
      res,
    );
  }),
);

router.post(
  '/bulk-upload',
  validator(schema.file, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const fileName: any = req['files'];
    if (fileName[0].mimetype !== 'text/csv' && fileName[0].mimetype !== 'text/csv') {
      return new BadRequestResponse('Invalid file type').send(res);
    }

    const now = moment();
    const csvFilePath = fileName[0].path;
    let dateToDB = '';
    const products: any = await csvToJson().fromFile(csvFilePath);

    let countOfAlreadyExisitingProducts = 0;
    let countOfProductsAdded = 0;
    let msgForAlreadyExisitingProducts = '';
    let countWithBadDataProducts = 0;
    let msgWithBadDataProducts = '';
    let addComma = '';
    if (products && products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const alreadyExist: any = await ProductRepo.findByName(product.productName);
        if (alreadyExist && alreadyExist.length === 0) {
          const productCat: any = await ProductCategoryRepo.fidnByName(product.productCategory);
          const expiryDateDiff = now.isBefore(product.productExpiry);
          if (
            product.productStoreId !== '' &&
            product.productSKU !== '' &&
            product.productBarCode !== '' &&
            product.productName !== '' &&
            product.productPurchasedPrice !== '' &&
            product.productSalePrice !== '' &&
            product.productCategory !== '' &&
            productCat.length > 0 &&
            expiryDateDiff
          ) {
            const {
              productStoreId,
              productSKU,
              productBarCode,
              productName,
              productQuantity,
              productPurchasedPrice,
              productSalePrice,
              productComparativePrice,
              productExpiry,
              productDescription,
              productDiscountAvailable,
              productDiscountActive,
              productTaxPercentage,
              productIsTaxable,
            } = product;
            const productCategoryId = productCat ? productCat[0].id : '';
            const productTaxable = productIsTaxable.trim() === 'yes' ? 1 : 0;
            const discountActive = productDiscountActive.trim() === 'yes' ? 1 : 0;

            dateToDB =
              dateToDB +
              `${addComma}(${productStoreId.trim()}, '${productSKU.trim()}', '${productBarCode.trim()}', '${productName.trim()}',
              '${productQuantity.trim()}', '${productPurchasedPrice.trim()}', '${productSalePrice.trim()}', '${productComparativePrice.trim()}',
              '${productExpiry.trim()}', '${productDescription.trim()}', '${productDiscountAvailable.trim()}',
              '${discountActive}', '${productTaxable}', '${productTaxPercentage.trim()}', '${productCategoryId}')`;

            countOfProductsAdded = countOfProductsAdded + 1;
            addComma = products[i + 1] !== undefined ? ',' : '';
          } else {
            countWithBadDataProducts = countWithBadDataProducts + 1;
            msgWithBadDataProducts = `Number of products with bad data: ${countWithBadDataProducts}. productStoreId, productSKU, productBarCode,
             productName, productPurchasedPrice, productSalePrice, productCategory are required fields and data should be right. If any of mentioned fields will be empty that specific product will not be added into system.`;
          }
        } else {
          countOfAlreadyExisitingProducts = countOfAlreadyExisitingProducts + 1;
          msgForAlreadyExisitingProducts =
            'Number of already existing products in system:' + countOfAlreadyExisitingProducts;
        }
      }
    }
    await fs.unlinkSync(`${csvFilePath}`);
    if (dateToDB && dateToDB !== '') {
      const bulkInsertResponse = await ProductRepo.bulkInsert(dateToDB);
      return new SuccessResponse('Products imported successfully', {
        data: bulkInsertResponse,
        countOfProductsAdded: countOfProductsAdded,
        msgWithBadDataProducts: msgWithBadDataProducts,
        msgForAlreadyExisitingProducts: msgForAlreadyExisitingProducts,
      }).send(res);
    }

    return new SuccessResponse('CSV file is empty or data is not correct in file', {
      data: products,
      msgWithBadDataProducts: msgWithBadDataProducts,
      msgForAlreadyExisitingProducts: msgForAlreadyExisitingProducts,
    }).send(res);
  }),
);

router.post(
  '/get-all-products',
  validator(schema.productList, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const roleId = req['roleId'];
    const productStoreId = roleId === 1 ? 1 : 2;
    const { storeId, allProducts, search } = req.body;
    let { page, limit, offSet } = getAdminPaginationParams(req);
    let list;
    let countTotal;
    if (search) {
      const countData = await ProductRepo.productCountBySearch(
        productStoreId,
        search.productCategoryId,
        search.searchTerm,
      );
      list = await ProductRepo.findBySearch(
        productStoreId,
        search.productCategoryId,
        search.searchTerm,
        limit,
        offSet,
      );
      return new SuccessResponse('success', {
        data: await productsCollectionResponse(list),
        pagination: getPaginationObject(page, countData[0].rowCount, limit),
      }).send(res);
    } else if (storeId) {
      countTotal = await ProductRepo.countData(storeId);
      list = await ProductRepo.getPaginationData(storeId, limit, offSet);
    } else if (allProducts) {
      countTotal = await ProductRepo.countProducts(productStoreId);
      list = await ProductRepo.getPaginationProducts(productStoreId, limit, offSet);
      return new SuccessResponse('success', {
        data: await productsCollectionResponse(list),
        pagination: getPaginationObject(page, countTotal[0].rowCount, limit),
      }).send(res);
    } else throw new BadRequestError('SubcategoryId is required');

    return new SuccessResponse('success', {
      data: await customStoreCollectionResponse(list),
      pagination: getPaginationObject(page, countTotal[0].rowCount, limit),
    }).send(res);
  }),
);

router.get(
  '/get-product/:productId',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const roleId = req['roleId'];
    const productStoreId = roleId === 1 ? 1 : 2;
    const { productId } = req.params;
    const product: any = await ProductRepo.findById(productStoreId, productId as unknown as number);
    if (!product || product.length === 0)
      throw new BadRequestResponse('Product not found!').send(res);
    return new SuccessResponse('success', productsResponse(product[0])).send(res);
  }),
);
// router.post(
//   '/update-imageName',
//   asyncHandler(async (req: ProtectedRequest, res) => {
//     const roleId = req['roleId'];
//     const productStoreId = roleId === 1 ? 1 : 2;
//     const { productId, productItemImage } = req.body;
//     let data1 = '';
//     if (productItemImage.split('/').length === 5) {
//       const itemImage = productItemImage.split('/');
//       data1 = itemImage[4];
//     } else {
//       const itemImage = productItemImage.split('/');
//       data1 = itemImage[8];
//     }
//     const checkProduct: any = await ProductRepo.findById(productStoreId, productId);
//     if (!checkProduct || checkProduct.length === 0)
//       throw new NotFoundResponse('Product not found!').send(res);

//     if (productId) {
//       const product: any = await ProductRepo.updateProductImage(productId, data1);
//       if (!product || product.length === 0)
//         throw new BadRequestResponse('Product not updated').send(res);
//       con.connect(async function (err) {
//         if (err) throw new BadRequestResponse('Product image not saved').send(res);
//         const sql = await `UPDATE productImages SET image ='${data1}' WHERE id = '${productId}'`;
//         con.query(sql, async function (err, result) {
//           if (err) throw new BadRequestResponse('Product image not saved').send(res);
//           return new SuccessResponse('Product successfully Updated', sql).send(res);
//         });
//       });
//       // const productImageRes: any = await ProductImageRepo.updateProductImage(productId, obj);
//       // console.log(productImageRes, 'productImageRes');
//       // if (!productImageRes || productImageRes.length === 0)
//       //   throw new BadRequestResponse('Product image not saved').send(res);
//       // return ;
//       // https://api.savoz.pk/api/src/public/uploads/categories/default_sub_category.png
//       return new SuccessResponse(product, `https://api.savoz.pk/savoz_images/${data1}`).send(res);
//     }
//   }),
// );
router.post(
  '/update-imageName',
  validator(schema.updateProductData, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const roleId = req['roleId'];
    const productStoreId = roleId === 1 ? 1 : 2;
    const {
      productId,
      productItemName,
      productItemDescription,
      productCategoryId,
      // productStoreId,
      productIsActive,
      productItemExpiry,
      productIsTaxable,
      productTaxPercentage,
      productItemBarCode,
      productPurchasedPrice,
      productQuantity,
      productItemBrand,
      productUnitPrice,
      productComparativePrice,
      productItemSKU,
      // productItemImage,
    } = req.body;
    const checkProduct: any = await ProductRepo.findById(productStoreId, productId);
    if (!checkProduct || checkProduct.length === 0)
      throw new NotFoundResponse('Product not found!').send(res);

    const productAlreadyExist: any = await ProductRepo.findByName(productItemName);
    if (
      productAlreadyExist &&
      productAlreadyExist.length > 0 &&
      productId != productAlreadyExist[0].productId
    )
      throw new BadRequestResponse('Product already Exist, Please use a different name.').send(res);

    let imageFile = '';
    const imageName: any = req['files'];
    if (imageName && imageName.length > 0) {
      if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
        return new BadRequestResponse('Invalid file type').send(res);
      }
      imageFile = imageName[0].filename;
    }

    const productItemImage = imageFile;
    const now = new Date();
    const obj = [
      productCategoryId,
      productIsTaxable,
      productTaxPercentage,
      productQuantity,
      productItemName,
      productItemBrand,
      productItemDescription,
      productPurchasedPrice,
      productUnitPrice,
      productComparativePrice,
      productIsActive,
      productItemExpiry,
      productStoreId,
      productItemBarCode,
      productItemSKU,
      productItemImage,
      now,
    ];
    const product: any = await ProductRepo.updateProduct(productId, obj);
    if (!product || product.length === 0)
      throw new BadRequestResponse('Product not updated').send(res);

    const checkProductImage: any = await ProductImageRepo.findByProductId(productId);
    let productImageRes: any = [];
    if (checkProductImage && checkProductImage.length > 0) {
      // imageFile = checkProductImage[0].image;
      const productImage = [imageFile];
      productImageRes = await ProductImageRepo.updateProductImage(
        checkProductImage[0].id,
        productImage,
      );
      if (!productImageRes || productImageRes.length === 0)
        throw new BadRequestResponse('Product image not saved').send(res);
    } else {
      if (imageFile !== '') {
        const productImage: ProductImage = {
          productId: checkProduct[0].productId,
          image: imageFile,
        };
        const productImageRes: any = await ProductImageRepo.createProductImage(productImage);
        if (!productImageRes || productImageRes.length === 0)
          throw new BadRequestResponse('Product image not saved').send(res);
      }
    }
    return new SuccessResponse(
      `https://api.savoz.pk/savoz_images/${productItemImage}`,
      product,
    ).send(res);
  }),
);

router.post(
  '/update-product',
  validator(schema.updateProductData, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const roleId = req['roleId'];

    const productStoreId = roleId === 1 ? 1 : 2;
    const {
      productId,
      productItemName,
      productItemDescription,
      productCategoryId,
      // productStoreId,
      productIsActive,
      productItemExpiry,
      productIsTaxable,
      productTaxPercentage,
      productItemBarCode,
      productPurchasedPrice,
      productQuantity,
      productItemBrand,
      productUnitPrice,
      productComparativePrice,
      productItemSKU,
      // productItemImage,
    } = req.body;
    let data1 = '';
    if (req.body?.productItemImage?.split('/').length === 5) {
      const itemImage = req.body?.productItemImage?.split('/');
      data1 = itemImage[4];
    } else if (req.body?.productItemImage?.split('/').length === 8) {
      const itemImage = req.body?.productItemImage?.split('/');
      data1 = itemImage[7];
    } else {
      const itemImage = req.body?.productItemImage?.split('/');
      data1 = itemImage[8];
    }
    const checkProduct: any = await ProductRepo.findById(productStoreId, productId);
    if (!checkProduct || checkProduct.length === 0)
      throw new NotFoundResponse('Product not found!').send(res);

    const productAlreadyExist: any = await ProductRepo.findByName(productItemName);
    if (
      productAlreadyExist &&
      productAlreadyExist.length > 0 &&
      productId != productAlreadyExist[0].productId
    )
      throw new BadRequestResponse('Product already Exist, Please use a different name.').send(res);

    // let imageFile = '';
    // const imageName: any = req['files'];
    // if (imageName && imageName.length > 0) {
    //   if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
    //     return new BadRequestResponse('Invalid file type').send(res);
    //   }
    //   imageFile = imageName[0].filename;
    // }

    // const productItemImage = imageFile;
    const productItemImage = data1;
    console.log(productItemImage, 'productItemImage');
    const now = new Date();
    const obj = [
      productCategoryId,
      productIsTaxable,
      productTaxPercentage,
      productQuantity,
      productItemName,
      productItemBrand,
      productItemDescription,
      productPurchasedPrice,
      productUnitPrice,
      productComparativePrice,
      productIsActive,
      productItemExpiry,
      productStoreId,
      productItemBarCode,
      productItemSKU,
      productItemImage,
      now,
    ];
    const product: any = await ProductRepo.updateProduct(productId, obj);
    if (!product || product.length === 0)
      throw new BadRequestResponse('Product not updated').send(res);

    // const checkProductImage: any = await ProductImageRepo.findByProductId(productId);
    // let productImageRes: any = [];
    // if (checkProductImage && checkProductImage.length > 0) {
    //   // imageFile = checkProductImage[0].image;
    //   const productImage = [imageFile];
    //   productImageRes = await ProductImageRepo.updateProductImage(
    //     checkProductImage[0].id,
    //     productImage,
    //   );
    //   if (!productImageRes || productImageRes.length === 0)
    //     throw new BadRequestResponse('Product image not saved').send(res);
    // } else {
    //   if (imageFile !== '') {
    //     const productImage: ProductImage = {
    //       productId: checkProduct[0].productId,
    //       image: imageFile,
    //     };
    //     const productImageRes: any = await ProductImageRepo.createProductImage(productImage);
    //     if (!productImageRes || productImageRes.length === 0)
    //       throw new BadRequestResponse('Product image not saved').send(res);
    //   }
    // }

    return new SuccessResponse('Product successfully Updated', product).send(res);
  }),
);

router.get(
  '/get-products-by-category',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const productsList = await ProductRepo.findByCategoryId(1);
    if (!productsList) throw new BadRequestResponse('Products not found!').send(res);
    return new SuccessResponse('success', productsList).send(res);
  }),
);

router.delete(
  '/delete-product',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const roleId = req['roleId'];
    const productStoreId = roleId === 1 ? 1 : 2;
    const { productId } = req.body;
    const productExist: any = await ProductRepo.findById(
      productStoreId,
      productId as unknown as number,
    );
    if (!productExist || productExist.length === 0)
      throw new BadRequestResponse('Product not found!').send(res);
    const product = await ProductRepo.deleteProductById(productId);
    if (product.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    return new SuccessResponse('success', product).send(res);
  }),
);

export default router;
