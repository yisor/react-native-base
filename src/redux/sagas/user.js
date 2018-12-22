import { call, put, take, fork, takeLatest } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { user } from '../actions';

function* login({ payload }) {
  try {
    // const response = yield call(request.post, api.login, payload);
    console.log('登录成功', JSON.stringify(payload));
    yield put(user.loginSuccess(payload));
    Actions.home();
  } catch (err) {
    yield put(user.loginFail());
    Toast.info(err.returnMsg);
  }
}


function* watchLogin() {
  yield takeLatest(user.LOGIN, login);
}


const sagas = [
  watchLogin,
]

export default sagas;