import urls from '../constants/urls';
import { getHomeUrl, getHomeForImage } from '../function/utils';

export async function customAdminUserResponse(data: any) {
  const userObj = {
    id: data.id,
    title: data.title,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    storeId: data.storeId || null,
    roleId: data.roleId || null,
    isActive: data.isActive,
    profileImage: data.profileImage,
    avatar: data.profileImage
      ? getHomeForImage(urls.values.imageProfileAdminLiveUrl) + data.profileImage
      : `${getHomeUrl(urls.values.imageProfileAdminLiveUrl)}imgPlaceholder.png`,
  };

  return userObj;
}

export async function customAdminUserCollectionResponse(data: any) {
  var users = [];
  var i;
  for (i = 0; i < data.length; i++) {
    users.push(await customAdminUserResponse(data[i]));
  }
  return users;
}
