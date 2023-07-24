import express from 'express';
import {
  BadRequestResponse,
  SuccessResponse,
  NotFoundResponse,
  InternalErrorResponse,
} from '../../../../core/ApiResponse';
// import CategoryRepo from '../../../../database/repository/CategoryRepo';
import ProductCategoryRepo from '../../../../database/repository/admin/ProductCategoryRepo';
import { ProtectedRequest } from 'app-request';
import { getAdminPaginationParams, getPaginationObject } from '../../../../function/utils';
import asyncHandler from '../../../../helpers/asyncHandler';
import authentication from '../../../../auth/authentication';
import validator, { ValidationSource } from '../../../../helpers/validator';
import schema from './schema';
import {
  customProductCategoryResponse,
  customProductCategoryCollectionResponse,
} from '../../../../custom/product-category-responses';
import ProductCategory from '../../../../database/model/admin/ProductCategory';
import CONSTANTS from '../../../../constants/constants';
import ProductRepo from '../../../../database/repository/admin/ProductRepo';
import SubCategoryRepo from '../../../../database/repository/admin/SubCategoryRepo';
const fs = require('fs');

const router = express.Router();
const csvToJson = require('csvtojson');

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.post(
  '/add-product-category',
  validator(schema.productCategory, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { name, description, subCategoryId, isActive, categoryImage } = req.body;
    let imageFile;
    const imageName: any = req['files'];
    if (imageName && imageName.length > 0) {
      if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
        return new BadRequestResponse('Invalid file type').send(res);
      }
      imageFile = imageName[0].filename;
    } else if (categoryImage && categoryImage !== '') {
      imageFile = categoryImage;
    }
    const obj: ProductCategory = {
      subCategoryId: subCategoryId,
      name: name,
      description: description,
      image: imageFile,
      isActive: isActive,
    };
    
    const isCategoryExist: any = await ProductCategoryRepo.fidnByName(name);
    if (isCategoryExist && isCategoryExist.length > 0)
      throw new BadRequestResponse(
        'Product Category already Exist, Please add a different name',
      ).send(res);
    const SubCategory = await ProductCategoryRepo.createProductCategory(obj);
    if (!SubCategory) throw new BadRequestResponse('Product Category not created').send(res);
    return new SuccessResponse('Product Category successfully created', SubCategory).send(res);
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

    const csvFilePath = fileName[0].path;
    let dateToDB = '';
    const ExistingProductCategories = await ProductCategoryRepo.getAllProductCategories();
    const productCategories: any = await csvToJson().fromFile(csvFilePath);
    let countOfAlreadyExisitingCats = 0;
    let msgForAlreadyExisitingCats = '';
    let countWithBadDataCats = 0;
    let msgWithBadDataCats = '';
    let addComma = '';
    if (productCategories && productCategories.length > 0) {
      for (let i = 0; i < productCategories.length; i++) {
        const productCat = productCategories[i];
        const alreadyExist = ExistingProductCategories.filter((category: any) => {
          return category.name === productCat.name;
        });
        if (alreadyExist.length === 0) {
          const category: any = await SubCategoryRepo.fidnByName(productCat.categoryName);
          if (productCat.name !== '' && productCat.categoryName !== '' && category.length > 0) {
            const isCatActive = productCat.isActive.toLowerCase().trim() === 'yes' ? 1 : 0;
            const subCategoryId = category[0].subCategoryId;
            const name = productCat.name.trim();
            const description = productCat.description.trim();
            const isActive = isCatActive;
            dateToDB =
              dateToDB + `${addComma}(${subCategoryId}, '${name}', ${isActive}, '${description}')`;
            addComma = productCategories[i + 1] !== undefined ? ',' : '';
          } else {
            countWithBadDataCats = countWithBadDataCats + 1;
            msgWithBadDataCats =
              'Product Category Name and Category Name are requried fields, Number of product categories with bad data:' +
              countWithBadDataCats;
          }
        } else {
          countOfAlreadyExisitingCats = countOfAlreadyExisitingCats + 1;
          msgForAlreadyExisitingCats =
            'Number of already existing products categories in system:' +
            countOfAlreadyExisitingCats;
        }
      }
    }
    await fs.unlinkSync(`${csvFilePath}`);
    if (dateToDB && dateToDB !== '') {
      const bulkInsertResponse = await ProductCategoryRepo.bulkInsert(dateToDB);
      return new SuccessResponse(
        `${bulkInsertResponse.affectedRows} Product Category(s) imported successfully`,
        {
          data: bulkInsertResponse,
          msgWithBadDataCats: msgWithBadDataCats,
          msgForAlreadyExisitingCats: msgForAlreadyExisitingCats,
        },
      ).send(res);
    }

    return new SuccessResponse('CSV file is empty or data is not correct in file', {
      data: productCategories,
      msgWithBadDataCats: msgWithBadDataCats,
      msgForAlreadyExisitingCats: msgForAlreadyExisitingCats,
    }).send(res);
  }),
);

router.get(
  '/get-product-category/:categoryId',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { categoryId } = req.params;
    const productCatData: any = await ProductCategoryRepo.findById(categoryId as unknown as number);
    if (!productCatData || productCatData === 0)
      throw new BadRequestResponse('Product Categories not found').send(res);
    return new SuccessResponse(
      'success',
      await customProductCategoryResponse(productCatData[0]),
    ).send(res);
  }),
);

router.post(
  '/update',
  validator(schema.productCategory, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { id, subCategoryId, name, description, isActive } = req.body;

    const checkProductCategory: any = await ProductCategoryRepo.findById(id);
    if (!checkProductCategory || checkProductCategory.length === 0)
      throw new NotFoundResponse('Category not found').send(res);

    const imageName: any = req['files'];
    let imageFile = checkProductCategory[0].image;
    if (imageName && imageName.length > 0) {
      if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
        return new BadRequestResponse('Invalid file type').send(res);
      }
      imageFile = imageName[0].filename;
    }
    const isCategoryExist: any = await ProductCategoryRepo.fidnByName(name);
    if (isCategoryExist && isCategoryExist.length > 0 && id != isCategoryExist[0].id)
      throw new BadRequestResponse('Product Category already Exist').send(res);

    const productCategoryData = [subCategoryId, name, description, imageFile, isActive];
    const data: any = await ProductCategoryRepo.updateProductCategory(id, productCategoryData);
    if (data.affectedRows <= 0) throw new InternalErrorResponse().send(res);

    const productCatData: any = await ProductCategoryRepo.findById(id);
    return new SuccessResponse(
      'Product Category successfully updated',
      await customProductCategoryResponse(productCatData[0]),
    ).send(res);
  }),
);

router.delete(
  '/delete-category/:categoryId',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { categoryId } = req.params;
    const category: any = await ProductCategoryRepo.deleteById(categoryId as unknown as number);
    if (!category) throw new BadRequestResponse('Product Category not found').send(res);

    // Deactivate the products when product category is deactivated
    await ProductRepo.productCategoriesDeactivate([categoryId]);
    return new SuccessResponse('success', category).send(res);
  }),
);

router.post(
  '/get-product-categories',
  validator(schema.productCategorySearch, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { search } = req.body;
    let { page, limit, offSet } = getAdminPaginationParams(req);
    let countData;
    if (search) {
      countData = await ProductCategoryRepo.productCategoriesCountBySearch(
        search.subCategoryId,
        search.searchTerm,
      );
      const list = await ProductCategoryRepo.findBySearch(
        search.subCategoryId,
        search.searchTerm,
        limit,
        offSet,
      );
      return new SuccessResponse('success', {
        data: await customProductCategoryCollectionResponse(list),
        pagination: getPaginationObject(page, countData[0].rowCount, limit),
      }).send(res);
    } else {
      countData = await ProductCategoryRepo.productCategoriesCount();
      const list = await ProductCategoryRepo.findByProductCategories(limit, offSet);
      return new SuccessResponse('success', {
        data: await customProductCategoryCollectionResponse(list),
        pagination: getPaginationObject(page, countData[0].rowCount, limit),
      }).send(res);
    }

    // const productCategories = await ProductCategoryRepo.getAllProductCategories();
    // if (!productCategories) throw new BadRequestResponse('Product Category not found').send(res);
    // return new SuccessResponse('success', productCategories).send(res);
  }),
);

router.get(
  '/get-product-categories-list',
  validator(schema.productCategorySearch, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const productCategories = await ProductCategoryRepo.getAllProductCategories();
    if (!productCategories) throw new BadRequestResponse('Product Category not found').send(res);
    return new SuccessResponse('success', productCategories).send(res);
  }),
);

export default router;
