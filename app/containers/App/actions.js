import {
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_PERMISSIONS,
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAILED,
  GET_CHECKBOX,
  GET_CHECKBOX_SUCCESS,
  GET_CHECKBOX_FAILED,
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
export function getPermissions(role) {
  return {
    type: GET_PERMISSIONS,
    payload: {
      role,
    },
  };
}

export function getCheckBox(value) {
  return {
    type: GET_CHECKBOX,
    payload: {
      value,
    },
  };
}

export function getPermissionsSuccess(roleSuccess) {
  return {
    type: GET_PERMISSIONS_SUCCESS,
    payload: {
      roleSuccess,
    },
  };
}
export function getPermissionsFailed(error) {
  return {
    type: GET_PERMISSIONS_FAILED,
    payload: {
      error,
    },
  };
}
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
