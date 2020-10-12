import React, { memo, useCallback, useEffect, useState } from 'react';
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
  makeSelectuserRoles,
  makeSelectListRoles,
  makeSelectRoleRoute,
} from '../App/selectors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getCheckBox, getPermissions } from '../App/actions';
import CheckBoxSetting from '../../components/CheckBox';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './../App/saga';
import useStyles from './style';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function Setting({ selectCheckBox, listRoles, selectRolePermissions }) {
  useInjectSaga({ key: 'global', saga });
  const classes = useStyles();
  const [role, setRole] = React.useState('');
  const [moduleRoles, setModuleRoles] = useState([
    {
      module: 'Customer',
      permissions: {
        view: false,
        update: false,
        export: false,
      },
    },
    {
      module: 'Export',
      permissions: {
        view: false,
        update: false,
        export: false,
      },
    },
  ]);
  useEffect(() => {
    if (listRoles.length > 0) {
      setModuleRoles([...listRoles[0].moduleRoles]);
    }
  }, [listRoles]);
  const handleChange = event => {
    setRole(event.target.value);
    selectRolePermissions(event.target.value);
  };

  const handleCheckBox = useCallback(
    event => {
      const name = event.target.name;
      const value = event.target.value;
      const check = event.target.checked;
      moduleRoles.forEach(item => {
        if (item.module === name) {
          const permissionsKey = Object.keys(item.permissions);
          if (permissionsKey[0] === value) {
            item.permissions.view = check;
          } else if (permissionsKey[1] === value) {
            item.permissions.update = check;
          } else {
            item.permissions.export = check;
          }
        }
      });
      setModuleRoles([...moduleRoles]);
    },
    [moduleRoles],
  );
  const handleSubmitPermissions = () => {
    console.log(listRoles);
    selectCheckBox(moduleRoles);
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
            <CheckBoxSetting
              moduleRoles={moduleRoles}
              role={role}
              handleChange={handleCheckBox}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
        onClick={handleSubmitPermissions}
      >
        Xác Nhận
      </Button>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  roleRoute: makeSelectRoleRoute(),
  userRoles: makeSelectuserRoles(),
  listRoles: makeSelectListRoles(),
});
const mapDispatchToProps = dispatch => {
  return {
    selectRolePermissions: data => dispatch(getPermissions(data)),
    selectCheckBox: data => dispatch(getCheckBox(data)),
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
