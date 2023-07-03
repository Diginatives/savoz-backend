import express from 'express';
import authentication from '../../../auth/authentication';
import { BadRequestError } from '../../../core/ApiError';
import {
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from '../../../core/ApiResponse';
import {
  customStoreCollectionResponse,
  customSubCategoriesCollectionResponse,
} from '../../../custom/product-responses';
import FavouriteProductRepo from '../../../database/repository/FavouriteProductRepo';
import ProductRepo from '../../../database/repository/ProductRepo';
import { getPaginationParams, getPaginationObject } from '../../../function/utils';
import asyncHandler from '../../../helpers/asyncHandler';
import validator, { ValidationSource } from '../../../helpers/validator';
import { updateData } from '../../../interfaces/default_types';
import { ProtectedRequest } from '../../../types/app-request';
import schema from './schema';

const router = express.Router();

router.post(
  '/product_listing',
  validator(schema.productListing, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { subCategoryId, storeId, searchText, userId } = req.body;
    let { page, limit, offSet } = getPaginationParams(req);
    let listing;
    let countTotal;
    if (subCategoryId && storeId) {
      const countData = await ProductRepo.countBySubCategory(subCategoryId, storeId);
      listing = await ProductRepo.findBySubCategory(
        subCategoryId,
        storeId,
        userId || null,
        limit,
        offSet,
      );
      return new SuccessResponse('success', {
        data: await customSubCategoriesCollectionResponse(listing),
        pagination: getPaginationObject(page, countData[0].rowCount, limit),
      }).send(res);
    } else if (storeId) {
      countTotal = await ProductRepo.countData(storeId, searchText ? searchText : '');
      listing = await ProductRepo.getPaginationData(
        storeId,
        userId || null,
        searchText ? searchText : '',
        limit,
        offSet,
      );
    } else throw new BadRequestError('SubcategoryId is required');
    return new SuccessResponse('success', {
      data: await customStoreCollectionResponse(listing),
      pagination: getPaginationObject(page, countTotal[0].rowCount, limit),
    }).send(res);
  }),
);

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

//Product Favorities API

router.get(
  '/favourite',
  asyncHandler(async (req: ProtectedRequest, res) => {
    let { page, limit, offSet } = getPaginationParams(req);

    const countData = await FavouriteProductRepo.countByUserId(req['userId']);
    const listing: any = await FavouriteProductRepo.findByUserId(req['userId'], limit, offSet);
    return new SuccessResponse('success', {
      data: await customStoreCollectionResponse(listing),
      pagination: getPaginationObject(page, countData[0].rowCount, limit),
    }).send(res);
  }),
);

router.post(
  '/favourite',
  validator(schema.favourite, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { userId, productId } = req.body;
    if (userId !== req['userId']) throw new BadRequestResponse('invalid userId').send(res);
    const isFavExists: any = await FavouriteProductRepo.findByUserIdAndProductId(userId, productId);
    if (isFavExists && isFavExists.length > 0) {
      return new SuccessResponse('Product added in favourites', isFavExists[0]).send(res);
    }
    const favouriteData: any = await FavouriteProductRepo.create(userId, productId);
    if (favouriteData) {
      return new SuccessResponse(
        'Product added in favourites',
        favouriteData.favouriteProduct,
      ).send(res);
    } else return new InternalErrorResponse().send(res);
  }),
);

router.delete(
  '/favourite',
  validator(schema.favouriteId, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { favouriteId } = req.body;

    const favData: any = await FavouriteProductRepo.findById(favouriteId);
    if (!favData || !favData[0]) {
      return new NotFoundResponse('favourite Product not find').send(res);
    }

    const data: updateData = await FavouriteProductRepo.deleteById(favouriteId);
    if (data.affectedRows) {
      return new SuccessResponse('Product removed from favourites', {}).send(res);
    } else return new InternalErrorResponse().send(res);
  }),
);

export default router;
