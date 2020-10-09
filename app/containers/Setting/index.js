import React, { memo, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRole,
  makeSelectuserRoles,
  makeSelectListRoles,
  makeSelectRoles,
  makeSelectRoleRoute,
} from '../App/selectors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getSelectPermissions } from '../App/actions';
import CheckBoxSetting from '../../components/CheckBox';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './../App/saga';
import useStyles from './style';

function Setting({ roleRoute, selectRoles, selectRolePermissions }) {
  useInjectSaga({ key: 'global', saga });
  const classes = useStyles();
  const [role, setRole] = React.useState('');
  const handleChange = event => {
    setRole(event.target.value);
    selectRolePermissions(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          onChange={handleChange}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="member">Member</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.module}>Module</TableCell>
              <TableCell align="right">View</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Export</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CheckBoxSetting selectRoles={selectRoles} role={role} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  roleRoute: makeSelectRoleRoute(),
  userRoles: makeSelectuserRoles(),
  selectRoles: makeSelectRoles(),
});
const mapDispatchToProps = dispatch => {
  return {
    selectRolePermissions: data => dispatch(getSelectPermissions(data)),
  };
};
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Setting);
