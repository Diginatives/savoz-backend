import express from 'express';
import { BadRequestError } from '../../../core/ApiError';
import { BadRequestResponse, SuccessResponse } from '../../../core/ApiResponse';
import { customSubCategoryCollectionResponse } from '../../../custom/subCategory-responses';
import SubCategory from '../../../database/model/SubCategory';
import SubCategoryRepo from '../../../database/repository/admin/SubCategoryRepo';
import CategoryRepo from '../../../database/repository/CategoryRepo';
import asyncHandler from '../../../helpers/asyncHandler';
import validator, { ValidationSource } from '../../../helpers/validator';
import { ProtectedRequest } from '../../../types/app-request';
import schema from './schema';
const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
// router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.post(
  '/sub_category',
  validator(schema.subCategory, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { name, description, mainCategoryId } = req.body;
    let imageName: any = req['files'];
    if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
      return new BadRequestResponse('Invalid file type').send(res);
    }
    const now = new Date();
    const imageFile = imageName[0].filename;

    const obj: SubCategory = {
      subCategoryName: name,
      subCategoryDescription: description,
      subCategoryMainCategoryId: mainCategoryId,
      subCategoryImage: imageFile,
      subCategoryCreatedAt: now,
      subCategoryUpdatedAt: now,
    };
    const SubCategory = await CategoryRepo.createSubCategory(obj);
    if (!SubCategory) throw new BadRequestResponse('SubCategory not created').send(res);
    return new SuccessResponse('Sub Category successfully created', SubCategory).send(res);
  }),
);

router.post(
  '/sub_category_listing',
  validator(schema.subCategoryListing, ValidationSource.BODY),
  asyncHandler(async (req, res) => {
    const { type } = req.body;
    const subCategoriesList = await CategoryRepo.findByType(type);
    return new SuccessResponse(
      'success',
      await customSubCategoryCollectionResponse(subCategoriesList),
    ).send(res);
  }),
);

// router.get(
//   '/get-categories',
//   asyncHandler(async (req: ProtectedRequest, res) => {
//     const categories = await SubCategoryRepo.findByMainCategoryId(1);
//     if (!categories) throw new BadRequestResponse('Categories not found').send(res);
//     return new SuccessResponse(
//       'success',
//       await customSubCategoryCollectionResponse(categories),
//     ).send(res);

//   }),
// );

export default router;
