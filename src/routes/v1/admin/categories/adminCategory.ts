import express from 'express';
import {
  BadRequestResponse,
  SuccessResponse,
  NotFoundResponse,
  InternalErrorResponse,
} from '../../../../core/ApiResponse';
// import CategoryRepo from '../../../../database/repository/CategoryRepo';
import SubCategoryRepo from '../../../../database/repository/admin/SubCategoryRepo';
import { ProtectedRequest } from 'app-request';
import asyncHandler from '../../../../helpers/asyncHandler';
import authentication from '../../../../auth/authentication';
import validator, { ValidationSource } from '../../../../helpers/validator';
import { customSubCategoryResponse } from '../../../../custom/subCategory-responses';
import schema from './schema';
import {
  customAdminSubCategoryResponse,
  customSubCategoryCollectionResponse,
} from '../../../../custom/admin-subCategory-responses';
import StoreSubCategory, {
  STORE_SUB_CATEGORY_COL,
  STORE_SUB_CATEGORY_TABLE_NAME,
} from '../../../../database/model/StoreSubCategory';
import ProductCategoryRepo from '../../../../database/repository/admin/ProductCategoryRepo';
import ProductRepo from '../../../../database/repository/admin/ProductRepo';
import MainCategoryRepo from '../../../../database/repository/admin/MainCategoryRepo';
const fs = require('fs');

const router = express.Router();
const csvToJson = require('csvtojson');

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.post(
  '/add-sub-category',
  validator(schema.subCategory, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { name, description, mainCategoryId, isActive, categoryImage } = req.body;
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
    const now = new Date();
    const obj = {
      subCategoryName: name,
      subCategoryDescription: description,
      subCategoryMainCategoryId: mainCategoryId,
      subCategoryImage: imageFile,
      subCategoryIsActive: isActive,
      subCategoryCreatedAt: now,
      subCategoryUpdatedAt: now,
    };

    const isCategoryExist: any = await SubCategoryRepo.fidnByName(name);

    if (isCategoryExist && isCategoryExist.length > 0)
      throw new BadRequestResponse('Category already Exist, Please use a different name.').send(
        res,
      );
    // const StoreSubCategory = await SubCategoryRepo.findByIdStore(id);
    // console.log(StoreSubCategory, 'StoreSubCategory');
    const SubCategory: any = await SubCategoryRepo.createSubCategory(obj);
    if (!SubCategory) throw new BadRequestResponse('Category not created').send(res);
    const objStore: StoreSubCategory = {
      subCategoryId: SubCategory.id,
      storeId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const storeSubCategory: any = await SubCategoryRepo.createStoreSubCategory(objStore);
    return new SuccessResponse(
      'Category successfully created',
      await customAdminSubCategoryResponse(SubCategory),
    ).send(res);
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
    const ExistingCategories = await SubCategoryRepo.findByMainCategoryId(1);
    const categories: any = await csvToJson().fromFile(csvFilePath);
    let countOfAlreadyExisitingCats = 0;
    let msgForAlreadyExisitingCats = '';
    let countWithBadDataCats = 0;
    let msgWithBadDataCats = '';
    let addComma = '';
    if (categories && categories.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const alreadyExist = ExistingCategories?.filter((existingCategory: any) => {
          return category.name === existingCategory.subCategoryName;
        });
        if (alreadyExist?.length === 0) {
          const mainCategory: any = await MainCategoryRepo.findByName(category.mainCategory);
          if (category.name !== '' && mainCategory.length > 0) {
            const mainCat = mainCategory[0].id;
            const name = category.name.trim();
            const description = category.description.trim();
            const isActive = category.isActive.toLowerCase().trim() == 'yes' ? 1 : 0;
            dateToDB =
              dateToDB + `${addComma}('${mainCat}','${name}', '${description}', ${isActive})`;
            addComma = categories[i + 1] !== undefined ? ',' : '';
          } else {
            countWithBadDataCats = countWithBadDataCats + 1;
            msgWithBadDataCats =
              'Category Name is requried field, Number of categories with bad data:' +
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
      const bulkInsertResponse = await SubCategoryRepo.bulkInsert(dateToDB);
      return new SuccessResponse(
        `${bulkInsertResponse.affectedRows} Category(s) imported successfully`,
        {
          data: bulkInsertResponse,
          msgWithBadDataCats: msgWithBadDataCats,
          msgForAlreadyExisitingCats: msgForAlreadyExisitingCats,
        },
      ).send(res);
    }

    return new SuccessResponse('CSV file is empty or data is not correct in file', {
      data: categories,
      msgWithBadDataCats: msgWithBadDataCats,
      msgForAlreadyExisitingCats: msgForAlreadyExisitingCats,
    }).send(res);
  }),
);

router.get(
  '/get-category/:categoryId',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { categoryId } = req.params;
    const category: any = await SubCategoryRepo.findById(categoryId as unknown as number);
    if (!category || category.length === 0)
      throw new BadRequestResponse('Categories not found').send(res);
    return new SuccessResponse('success', await customAdminSubCategoryResponse(category[0])).send(
      res,
    );
  }),
);

router.post(
  '/update-category',
  validator(schema.subCategory, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { id, mainCategoryId, name, description, isActive } = req.body;

    const checkSubCategory: any = await SubCategoryRepo.findById(id);
    if (!checkSubCategory || checkSubCategory.length === 0)
      throw new NotFoundResponse('Category not found').send(res);

    const imageName: any = req['files'];
    let subCategoryImage = checkSubCategory[0].subCategoryImage;
    if (imageName && imageName.length > 0) {
      if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
        return new BadRequestResponse('Invalid file type').send(res);
      }
      subCategoryImage = imageName[0].filename;
    }

    const isCategoryExist: any = await SubCategoryRepo.fidnByName(name);
    if (isCategoryExist && isCategoryExist.length > 0 && id != isCategoryExist[0].subCategoryId)
      throw new BadRequestResponse('Category already Exist, Please use a different name.').send(
        res,
      );
    const now = new Date();
    const subCategoryObj = [mainCategoryId, name, description, subCategoryImage, isActive, now];
    const data: any = await SubCategoryRepo.updateSubCategory(id, subCategoryObj);
    if (data.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    const subCategoryData: any = await SubCategoryRepo.findById(id);
    return new SuccessResponse(
      'Category successfully updated',
      await customAdminSubCategoryResponse(subCategoryData[0]),
    ).send(res);
  }),
);

router.delete(
  '/delete-category/:categoryId',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { categoryId } = req.params;
    const category: any = await SubCategoryRepo.deleteById(categoryId as unknown as number);
    if (!category) throw new BadRequestResponse('Category not found').send(res);
    const storeSubCategory: any = await ProductCategoryRepo.deleteStoreSubcategory(
      categoryId as unknown as number,
    );
    // Deactivate the product categories when parent category is deleted
    const proCatsIds = await ProductCategoryRepo.productCategoriesIds(
      categoryId as unknown as number,
    );
    if (proCatsIds && proCatsIds.length > 0) {
      const productCats: any = [];
      proCatsIds.forEach((element: any) => {
        productCats.push(element.id);
      });
      await ProductCategoryRepo.productCategoriesDeactivate(productCats);
      // Deactivate the products when product category is deactivated
      await ProductRepo.productCategoriesDeactivate(productCats);
    }

    return new SuccessResponse('success', category).send(res);
  }),
);

router.get(
  '/get-categories',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const categories = await SubCategoryRepo.findByMainCategoryId(1);
    if (!categories) throw new BadRequestResponse('Categories not found').send(res);
    return new SuccessResponse(
      'success',
      await customSubCategoryCollectionResponse(categories),
    ).send(res);
  }),
);

export default router;
