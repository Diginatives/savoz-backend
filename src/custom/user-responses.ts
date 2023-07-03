import urls from '../constants/urls';
import { getHomeUrl, getHomeForImage } from '../function/utils';

export async function customUserResponse(data: any) {
  const userObj = {
    id: data.id,
    title: data.title,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    address: data.address || null,
    dob: data.dob || null,
    userLat: data.userLat || null,
    userLng: data.userLng || null,
    stripeId: data.stripeId || null,
    cardId: data.cardId || null,
    avatar: data.avatar
      ? getHomeUrl(urls.values.imageLiveUrl) + data.avatar
      : `${getHomeUrl(urls.values.imageLiveUrl)}imgPlaceholder.png`,
    roleId: data.roleId,
  };

  return userObj;
}

export async function customUserCollectionResponse(data: any) {
  var users = [];
  var i;
  for (i = 0; i < data.length; i++) {
    users.push(await customUserResponse(data[i]));
  }
  return users;
}
