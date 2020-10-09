import {
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
} from './constants';

export function login(data) {
  return {
    type: LOGIN,
    payload: {
      data,
    },
  };
}
export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      data,
    },
  };
}
export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    payload: {
      error,
    },
  };
}
export function getCurrentUser() {
  return {
    type: GET_CURRENT_USER,
  };
}
export function getCurrentUserSuccess(userRole) {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    payload: {
      userRole,
    },
  };
}
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
