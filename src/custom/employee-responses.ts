import urls from '../constants/urls';
import { getHomeUrl, getHomeForImage } from '../function/utils';

export async function customEmployeeResponse(data: any) {
  const userObj = {
    id: data.id,
    title: data.name,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    designation: data.designation,
    roleId: data.roleId,
    storeId: data.storeId,
    profileImage: data.profileImage,
    avatar: data.profileImage
      ? getHomeForImage(urls.values.imageProfileAdminLiveUrl) + data.profileImage
      : `${getHomeUrl(urls.values.imageProfileAdminLiveUrl)}imgPlaceholder.png`,
    isActive: data.isActive,
    isAdmin: data.isAdmin,
  };

  return userObj;
}

export async function customEmployeeCollectionResponse(data: any) {
  var users = [];
  var i;
  for (i = 0; i < data.length; i++) {
    users.push(await this.customUserResponse(data[i]));
  }
  return users;
}
