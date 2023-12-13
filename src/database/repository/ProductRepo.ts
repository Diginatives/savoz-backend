import { PRODUCT_TABLE_NAME, PRODUCT_COL } from '../model/Product';
import { executeQuery, updateRecord } from '../index';
import { PRODUCT_CATEGORY_COL, PRODUCT_CATEGORY_TABLE_NAME } from '../model/ProductCategory';
import { FAVOURITE_PRODUCT_COL, FAVOURITE_PRODUCT_TABLE_NAME } from '../model/Favourite';
import { getStoreId } from '../../function/utils';
import { getProductImage } from '../../custom/product-responses';

export default class ProductRepo {
  public static async validateProductQuantities(products: any, orderType: number): Promise<any> {
    const storeId = getStoreId(orderType);
    let productsList: any = [];
    let isError: boolean = false;
    for (const product of products) {
      const isExist = await this.ProductQuantityExists(
        product.productItemSKU,
        storeId,
        product.quantity,
        product.productId,
      );
      if (isExist && isExist.hasOwnProperty('isAvailable')) {
        if (!isExist.isAvailable) isError = true;
      }
      if (!isExist) isError = true;
      productsList.push({
        product:
          isExist && isExist.hasOwnProperty('isAvailable')
            ? {
                ...isExist,
                productItemImage: await getProductImage(
                  isExist.productItemImage,
                  isExist.productItemThumbnail,
                ),
                productItemThumbnail: await getProductImage(
                  isExist.productItemImage,
                  isExist.productItemThumbnail,
                ),
              }
            : null,
        ...product,
        isAvailable: isExist && isExist.hasOwnProperty('isAvailable') ? isExist.isAvailable : false,
      });
    }
    return { productsList, isError };
  }

  public static async ProductQuantityExists(
    productSKU: any,
    storeId: number,
    quantity: number,
    productId: number,
  ): Promise<any> {
    const data = await this.findById(productId);
    if (data.length > 0) {
      return {
        ...data[0],
        isAvailable: data[0].productQuantity >= quantity && quantity > 0 ? true : false,
      };
    }
    const query: any = await this.findBySKU(productSKU.toString());
    if (query.length > 0) {
      return {
        ...query[0],
        isAvailable: query[0].productQuantity >= quantity && quantity > 0 ? true : false,
      };
    }

    // if (storeId === ORDER_TYPE_ID.TYPE20) {
    //   const data = await this.findById(productId);
    //   if (data.length > 0) {
    //     return {
    //       ...data[0],
    //       isAvailable: data[0].productQuantity >= quantity && quantity > 0 ? true : false,
    //     };
    //   }
    //   const query: any = await this.findBySKU(productSKU.toString());
    //   if (query.length > 0) {
    //     return {
    //       ...query[0],
    //       isAvailable: query[0].productQuantity >= quantity && quantity > 0 ? true : false,
    //     };
    //   }
    // }
    return null;
  }
  public static async findById(id: number): Promise<any> {
    const query: string = `Select * from ${PRODUCT_TABLE_NAME} 
   where ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} = ${id}`;
    return await executeQuery(query);
  }

  public static async findBySKU(sku: string): Promise<any> {
    const query: string = `Select * from ${PRODUCT_TABLE_NAME} 
   where ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemSKU} = '${sku}'`;
    return await executeQuery(query);
  }

  public static async updateQuantity(productId: number, quantity: number): Promise<any> {
    return await updateRecord(
      `update ${PRODUCT_TABLE_NAME} set ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productQuantity}=?
     where  ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId}=${productId} `,
      [quantity.toString()],
    );
  }

  public static async countBySubCategory(id: number, storeId: number): Promise<any> {
    const query: string = `Select count(*) as rowCount from ${PRODUCT_TABLE_NAME} inner join ${PRODUCT_CATEGORY_TABLE_NAME} on ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORY_TABLE_NAME}.${PRODUCT_CATEGORY_COL.id}
   where ${PRODUCT_CATEGORY_TABLE_NAME}.${PRODUCT_CATEGORY_COL.subCategoryId} = ${id} && ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productStoreId} = ${storeId}`;
    return await executeQuery(query);
  }

  public static async findBySubCategory(
    id: number,
    storeId: number,
    userId: number,
    limit: number,
    offSet: number,
  ): Promise<any> {
    console.log(`Select *,${FAVOURITE_PRODUCT_TABLE_NAME}.${
      FAVOURITE_PRODUCT_COL.id
    } as ${`favouriteId`}, 
    ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} as ${`productId`}
    from ${PRODUCT_TABLE_NAME} inner join ${PRODUCT_CATEGORY_TABLE_NAME} on ${PRODUCT_TABLE_NAME}.${
      PRODUCT_COL.productCategoryId
    } = ${PRODUCT_CATEGORY_TABLE_NAME}.${PRODUCT_CATEGORY_COL.id}
    left join ${FAVOURITE_PRODUCT_TABLE_NAME} on ${FAVOURITE_PRODUCT_TABLE_NAME}.${
      FAVOURITE_PRODUCT_COL.productId
    } = ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} and ${FAVOURITE_PRODUCT_TABLE_NAME}.${
      FAVOURITE_PRODUCT_COL.userId
    } = ${userId}
    where ${PRODUCT_CATEGORY_TABLE_NAME}.${
      PRODUCT_CATEGORY_COL.subCategoryId
    }  = ${id} && ${PRODUCT_TABLE_NAME}.${
      PRODUCT_COL.productStoreId
    } = ${storeId} LIMIT ${limit} OFFSET ${offSet}`);
    const query: string = `Select *,${FAVOURITE_PRODUCT_TABLE_NAME}.${
      FAVOURITE_PRODUCT_COL.id
    } as ${`favouriteId`}, 
    ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} as ${`productId`}
    from ${PRODUCT_TABLE_NAME} inner join ${PRODUCT_CATEGORY_TABLE_NAME} on ${PRODUCT_TABLE_NAME}.${
      PRODUCT_COL.productCategoryId
    } = ${PRODUCT_CATEGORY_TABLE_NAME}.${PRODUCT_CATEGORY_COL.id}
    left join ${FAVOURITE_PRODUCT_TABLE_NAME} on ${FAVOURITE_PRODUCT_TABLE_NAME}.${
      FAVOURITE_PRODUCT_COL.productId
    } = ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} and ${FAVOURITE_PRODUCT_TABLE_NAME}.${
      FAVOURITE_PRODUCT_COL.userId
    } = ${userId}
    where ${PRODUCT_CATEGORY_TABLE_NAME}.${
      PRODUCT_CATEGORY_COL.subCategoryId
    }  = ${id} && ${PRODUCT_TABLE_NAME}.${
      PRODUCT_COL.productStoreId
    } = ${storeId} LIMIT ${limit} OFFSET ${offSet}`;
    return await executeQuery(query);
  }

  public static async countData(storeId: number, searchText: string): Promise<any> {
    // const query: string = `Select COUNT(*) AS rowCount from ${PRODUCT_TABLE_NAME} where (
    //    ${PRODUCT_COL.productItemDescription} Like '%${searchText}%'
    //  or ${PRODUCT_COL.productItemBrand} Like '%${searchText}%'
    // or  ${PRODUCT_COL.productItemName} Like '%${searchText}%')`;
    const query: string = `Select COUNT(*) AS rowCount from ${PRODUCT_TABLE_NAME} where 
    ${PRODUCT_COL.productItemName} Like '%${searchText}%' and (${PRODUCT_COL.productStoreId} = ${storeId})`;

    return await executeQuery(query);
  }

  public static async getPaginationData(
    storeId: number,
    userId: number,
    searchText: string,
    limit: number,
    offSet: number,
  ): Promise<any> {
    const query: string = `Select *,${FAVOURITE_PRODUCT_TABLE_NAME}.${
      FAVOURITE_PRODUCT_COL.id
    } as ${`favouriteId`},
      ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} as ${`productId`}
      from ${PRODUCT_TABLE_NAME}
     left join ${FAVOURITE_PRODUCT_TABLE_NAME} on ${FAVOURITE_PRODUCT_TABLE_NAME}.${
      FAVOURITE_PRODUCT_COL.productId
    } = ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} and ${FAVOURITE_PRODUCT_TABLE_NAME}.${
      FAVOURITE_PRODUCT_COL.userId
    } = ${userId}
      where (${PRODUCT_COL.productItemDescription} Like '%${searchText}%' or ${
      PRODUCT_COL.productItemBrand
    } Like '%${searchText}%' or  ${PRODUCT_COL.productItemName} Like '%${searchText}%') 
    and (${PRODUCT_COL.productStoreId} = ${storeId})
      LIMIT ${limit} OFFSET ${offSet}`;

    //     const query: string = `Select *,${FAVOURITE_PRODUCT_TABLE_NAME}.${
    //       FAVOURITE_PRODUCT_COL.id
    //     } as ${`favouriteId`},
    //   ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} as ${`productId`}
    //   from ${PRODUCT_TABLE_NAME}
    //  left join ${FAVOURITE_PRODUCT_TABLE_NAME} on ${FAVOURITE_PRODUCT_TABLE_NAME}.${
    //       FAVOURITE_PRODUCT_COL.productId
    //     } = ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} and ${FAVOURITE_PRODUCT_TABLE_NAME}.${
    //       FAVOURITE_PRODUCT_COL.userId
    //     } = ${userId}
    //   where ${PRODUCT_COL.productItemName} Like '%${searchText}%'
    //   LIMIT ${limit} OFFSET ${offSet}`;
    return await executeQuery(query);
  }
}

// and ${PRODUCT_COL.productStoreId} = ${storeId}
//and in getPaginationData before LIMIT
// also Add in countData
