import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { loginFailed, loginSuccess } from './../App/actions';
import { LOGIN } from './../App/constants';
import request from 'utils/request';

// Individual exports for testing
export function* loginSaga({ payload }) {
  // See example in containers/HomePage/saga.js
  const { data } = payload;
  const requestURL = 'https://test-api-lan3.herokuapp.com/auth/login';
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const resp = yield call(request, requestURL, requestOptions);
    const userRoles = JSON.stringify(resp.userRoles);
    localStorage.setItem('token', resp.token);
    localStorage.setItem('userRoles', userRoles);
    yield put(loginSuccess(resp.token));
  } catch (error) {
    yield put(loginFailed(error));
  }
}

export default function* userData() {
  yield takeLatest(LOGIN, loginSaga);
}
