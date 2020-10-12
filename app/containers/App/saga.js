import { put, call, takeLatest, select, delay } from 'redux-saga/effects';
import {
  getCurrentUserSuccess,
  getPermissionsFailed,
  getPermissionsSuccess,
} from './../App/actions';
import {
  GET_CHECKBOX,
  GET_CURRENT_USER,
  GET_PERMISSIONS,
} from './../App/constants';
import request from 'utils/request';
import { makeSelectListRoles } from './selectors';

// Individual exports for testing
export function* userRoles() {
  // See example in containers/HomePage/saga.js
  const userRoles = JSON.parse(localStorage.getItem('userRoles'));
  yield put(getCurrentUserSuccess(userRoles));
}
export function* selectPermissions({ payload }) {
  const { role } = payload;
  const token = localStorage.getItem('token');
  const requestURL = `https://test-api-lan3.herokuapp.com/listRoles?role=${role}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const resp = yield call(request, requestURL, requestOptions);
    yield put(getPermissionsSuccess(resp));
  } catch (error) {
    yield put(getPermissionsFailed(error));
  }
}
export function* selectCheckBox({ payload }) {
  const { value } = payload;
  const listRoles = yield select(makeSelectListRoles());
  const requestData = { ...listRoles[0], moduleRoles: value };
  const token = localStorage.getItem('token');
  const requestURL = `https://test-api-lan3.herokuapp.com/listRoles/${
    listRoles[0].id
  }`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(requestData),
  };

  try {
    const res = yield call(request, requestURL, requestOptions);
    alert('Cập nhật thành công');
    // yield put(getCheckBoxSuccess(finalState));
  } catch (error) {
    // yield put(getCheckBoxFailed(error));
    alert('Cập nhật không thành công');
  }
}

export default function* getUser() {
  yield takeLatest(GET_CURRENT_USER, userRoles);
  yield takeLatest(GET_PERMISSIONS, selectPermissions);
  yield takeLatest(GET_CHECKBOX, selectCheckBox);
}
