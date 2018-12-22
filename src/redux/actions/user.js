import createAction from '@/utils/createAction';

export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const userLogin = createAction(LOGIN)
export const loginFail = createAction(LOGIN_FAIL)
export const loginSuccess = createAction(LOGIN_SUCCESS)