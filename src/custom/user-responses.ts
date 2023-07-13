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
    address: data.address || '',
    dob: data.dob || '',
    userLat: data.userLat || '',
    userLng: data.userLng || '',
    stripeId: data.stripeId || '',
    cardId: data.cardId || '',
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
