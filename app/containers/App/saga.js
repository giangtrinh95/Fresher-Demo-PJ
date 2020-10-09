import { put, takeLatest } from 'redux-saga/effects';
import { getCurrentUserSuccess } from './../App/actions';
import { GET_CURRENT_USER } from './../App/constants';
import request from 'utils/request';

// Individual exports for testing
export function* getUserRoles() {
  // See example in containers/HomePage/saga.js
  const userRoles = JSON.parse(localStorage.getItem('userRoles'));
  yield put(getCurrentUserSuccess(userRoles));
}

export default function* getUser() {
  yield takeLatest(GET_CURRENT_USER, getUserRoles);
}
