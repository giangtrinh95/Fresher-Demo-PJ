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
} from './constants';
export const initialState = {
  username: '',
  isLoggin: false,
  loading: false,
  error: false,
  userRoles: [
    {
      module: 'report',
      permissions: ['view', 'update'],
    },
  ],
  role: '',
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
        draft.userRoles = data.userRoles;
        break;
      case LOGOUT:
        localStorage.clear('token');
        draft.username = '';
        draft.role = '';
        draft.isLoggin = false;
    }
  });

export default appReducer;
