import { put, takeLatest } from 'redux-saga/effects';
import {
  getCurrentUserSuccess,
  getSelectPermissionsSuccess,
} from './../App/actions';
import { GET_CURRENT_USER, GET_SELECT_PERMISSIONS } from './../App/constants';

// Individual exports for testing
export function* userRoles() {
  // See example in containers/HomePage/saga.js
  const userRoles = JSON.parse(localStorage.getItem('userRoles'));
  yield put(getCurrentUserSuccess(userRoles));
}
export function* selectPermissions({ payload }) {
  const { role } = payload;
  // See example in containers/HomePage/saga.js
  yield put(getSelectPermissionsSuccess(role));
}

export default function* getUser() {
  yield takeLatest(GET_CURRENT_USER, userRoles);
  yield takeLatest(GET_SELECT_PERMISSIONS, selectPermissions);
}
