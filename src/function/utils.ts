const fs = require('fs');
import config from 'config';

export const getEnvKey = (key: string) => {
  const envValue: string = process.env.NODE_ENV || 'development';
  const dbValues: any = config.get(envValue);
  return dbValues.get(key);
};

export const getFileExtenson = (fileName: string) => {
  if (fileName) {
    return fileName.split('.').pop();
  }
  return 'invalid';
};

export const getAdminPaginationParams = (req: any) => {
  const page: number = parseInt(<string>req.query.page) || 1;
  const limit: number = parseInt(<string>req.query.limit) || 20;
  const offSet: number = page > 1 ? (page - 1) * limit : 0;

  return { page, limit, offSet };
};

export const getPaginationParams = (req: any) => {
  const page: number = parseInt(<string>req.query.page) || 1;
  const limit: number = parseInt(<string>req.query.limit) || 10;
  const offSet: number = page > 1 ? (page - 1) * limit : 0;

  return { page, limit, offSet };
};

export const getPaginationObject = (page: number, countTotal: number, limit: number) => {
  let totalPages = Math.ceil(countTotal / limit);
  let nextPage = 0;
  let prevPage = -1;

  if (page * limit < countTotal) {
    nextPage = +page + 1;
  } else if (page * limit === countTotal) {
    nextPage = 0;
  } else if (page * limit > countTotal) {
    nextPage = 0;
  }

  return {
    page: page,
    limit: limit,
    prevPage: prevPage,
    nextPage: nextPage,
    totalPages: totalPages === 0 ? 1 : totalPages,
    totalCount: countTotal,
  };
};

export const addBaseURLApp = (url: string) => {
  const envValue: string = process.env.NODE_ENV || 'development';
  if (envValue === 'development') {
    return `savoz://app/v1/${url}`;
  }
  return `savoz://app/v1/${url}`;
};

export const addBaseURLWeb = (url: string) => {
  const envValue: string = process.env.NODE_ENV || 'development';
  if (envValue === 'development') {
    return `https://laughing-jones-c6f0c1.netlify.app/${url}`;
  }
  return `https://laughing-jones-c6f0c1.netlify.app/${url}`;
};

export const unLinkFile = async (directory: string, url: string) => {
  if (!url) return '';
  await fs.unlinkSync(`${directory}${url}`);
};

export const getHomeUrl = (url: string) => {
  const envValue: string = process.env.NODE_ENV || 'development';
  if (envValue === 'development') {
    return `https://mashghol.com/savoz-backend/${url}`;
  }
  return `https://mashghol.com/savoz-backend/${url}`;
};

export const getHomeForImage = (url: string) => {
  const envValue: string = process.env.NODE_ENV || 'development';
  if (envValue === 'development') {
    return `https://mashghol.com/${url}`;
  }
  return `https://mashghol.com/${url}`;
};

export const transferAmountForStripe = (rate: string) => {
  if (rate.indexOf('.') !== -1) {
    rate = rate.replace('.', '');
  } else {
    rate = `${rate}00`;
  }
  return parseInt(`${rate}`);
};

export const fixedPrice = (price: number) => {
  if (!isNaN(price)) {
    return Number(price.toFixed(2));
  }
  return 0;
};

export const getDataBy = (option: number) => {
  let groupBy = 'DAYNAME';
  if (option === 30) {
    groupBy = 'WEEK';
  } else if (option === 365) {
    groupBy = 'MONTHNAME';
  }
  return groupBy;
};

export const orderDataBy = (option: number) => {
  let orderBy = 'WEEKDAY';
  if (option === 30) {
    orderBy = 'WEEK';
  } else if (option === 365) {
    orderBy = 'MONTH';
  }
  return orderBy;
};

export const base64FileHeaderMapper = (fileBase64: any) => {
  let fileHeader: any = new Map();

  fileHeader.set('/9j', 'JPG');
  fileHeader.set('iVB', 'PNG');
  fileHeader.set('Qk0', 'BMP');
  fileHeader.set('SUk', 'TIFF');
  fileHeader.set('JVB', 'PDF');
  fileHeader.set('UEs', 'OFD');

  let res: any = '';

  fileHeader.forEach((v: any, k: any) => {
    if (k === fileBase64.substr(0, 3)) {
      res = v;
    }
  });
  if (res === '') {
    res = 'unknown file';
  }
  return res;
};

export const getStoreId = (type: number) => {
  if (type === 24) return 1;
  else return 2;
};
