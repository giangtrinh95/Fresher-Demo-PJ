/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import jwt_decode from 'jwt-decode';
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
} from './constants';
export const initialState = {
  username: '',
  isLoggin: false,
  loading: false,
  error: false,
  userRoles: [],
  role: '',
  listRoles: [],
  selectRoles: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.loading = true;
        draft.error = false;
        // draft.isLoggin = false;
        break;
      case LOGIN_SUCCESS:
        const { data } = action.payload;
        const decodeJWT = jwt_decode(data);
        draft.username = decodeJWT.username;
        draft.loading = false;
        draft.isLoggin = true;
        draft.error = false;
        draft.role = decodeJWT.role;
        break;
      case LOGIN_FAILED:
        const { error } = action.payload;
        alert(error.message);
        draft.loading = false;
        draft.error = error.message;
        draft.isLoggin = false;
        break;
      case GET_CURRENT_USER:
        // const
        break;
      case GET_CURRENT_USER_SUCCESS:
        const { userRole } = action.payload;
        // const
        draft.userRoles = userRole;
        break;
      case GET_PERMISSIONS:
        draft.loading = true;
        break;
      case GET_PERMISSIONS_SUCCESS:
        const { roleSuccess } = action.payload;
        draft.loading = false;
        draft.listRoles = roleSuccess;
        break;
      case GET_PERMISSIONS_FAILED: {
        const { error } = action.payload;
        draft.error = error;
        draft.loading = false;

        break;
      }

      case LOGOUT:
        localStorage.clear('token');
        draft.username = '';
        draft.role = '';
        draft.isLoggin = false;
        draft.userRoles = null;
        break;
    }
  });

export default appReducer;
