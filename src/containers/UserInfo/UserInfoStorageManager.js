import { store } from 'app';

export function setImpersonate(data) {
  const user = store.getState().get('sso').get('oidc').user;
  const localImpersonateData = JSON.parse(localStorage.getItem('impersonateData')) || {};
  localImpersonateData[user.profile.email] = data;
  localStorage.setItem('impersonateData', JSON.stringify(localImpersonateData));
}

export function getImpersonate() {
  const user = store.getState().get('sso').get('oidc').user;
  const localImpersonateData = JSON.parse(localStorage.getItem('impersonateData'));
  return localImpersonateData ? localImpersonateData[user.profile.email] : undefined;
}

export function removeImpersonate() {
  const user = store.getState().get('sso').get('oidc').user;
  const localImpersonateData = JSON.parse(localStorage.getItem('impersonateData'));
  if (localImpersonateData) {
    delete (localImpersonateData[user.profile.email]);
  }
  localStorage.setItem('impersonateData', JSON.stringify(localImpersonateData));
}