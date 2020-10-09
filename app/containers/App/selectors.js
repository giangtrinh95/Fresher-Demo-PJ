import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectGlobal = state => state.global || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

// const makeSelectLoginPage = () =>
//   createSelector(
//     selectGlobal,
//     substate => substate,
//   );
const makeSelectUsername = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.username,
  );
const makeSelectRole = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.role,
  );
const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );
const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );
const makeSelectIsLoggin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isLoggin,
  );
const makeSelectAccessControl = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.AccessControl,
  );
const makeSelectuserRoles = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userRoles,
  );
export {
  selectGlobal,
  makeSelectUsername,
  makeSelectRole,
  makeSelectLoading,
  makeSelectError,
  makeSelectIsLoggin,
  makeSelectAccessControl,
  makeSelectuserRoles,
};
