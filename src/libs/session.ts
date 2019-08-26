import * as apis from '../apis'

var authenticationUpdateListener;
const notifyAuthenUpdateListener = () => {
  if (typeof authenticationUpdateListener == 'function') {
    authenticationUpdateListener();
  } 
}

export const setAuthenticationUpdateListener = (listener) => {
  authenticationUpdateListener = listener;
}

export const LOCAL_KEYS = {
  ACCESS_TOKEN_KEY: 'access_token'
}

export const getLocal = key => {
  return localStorage.getItem(key) || ''
}

export const setLocal = (key, value) => {
  localStorage.setItem(key, value)
}

export const removeLocal = key => {
  localStorage.removeItem(key)
}

export const login = async () => {
  try {
    const accessToken = await apis.loginWithCodelink();
    setLocal(LOCAL_KEYS.ACCESS_TOKEN_KEY, accessToken)
  } catch (err) {
    removeLocal(LOCAL_KEYS.ACCESS_TOKEN_KEY)
  }
  notifyAuthenUpdateListener()
}

export const getCurrentSession = async () => {
  const localAccessToken = getLocal(LOCAL_KEYS.ACCESS_TOKEN_KEY)
  if (localAccessToken !== '') {
     return localAccessToken
  }

  try {
    const accessToken = await apis.getSession();
    setLocal(LOCAL_KEYS.ACCESS_TOKEN_KEY, accessToken)
    return accessToken
  } catch (err) {
    removeLocal(LOCAL_KEYS.ACCESS_TOKEN_KEY)
  }
  notifyAuthenUpdateListener()

  return ''
}

export const logout = async () => {
  try {
    await apis.logout()
  } catch(err) {}
  removeLocal(LOCAL_KEYS.ACCESS_TOKEN_KEY)
  notifyAuthenUpdateListener()
} 

export const isAuthenticated = () => {
   return !!getLocal(LOCAL_KEYS.ACCESS_TOKEN_KEY)
}

export const ssoCallback = async (ssoToken) => {
  try {
    const ssoUserToken = await apis.ssoCallback(ssoToken)
    if (ssoUserToken.user_token && ssoUserToken.sso_user) {
      alert('SSO logged in: user token: ' + ssoUserToken.user_token  + ' & user email: ' + ssoUserToken.sso_user.email)
    }
    setLocal(LOCAL_KEYS.ACCESS_TOKEN_KEY, ssoUserToken.user_token)
  } catch (err) {
    removeLocal(LOCAL_KEYS.ACCESS_TOKEN_KEY)
  }
  notifyAuthenUpdateListener()
}