import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckBox from 'components/UserRoles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRole,
  makeSelectuserRoles,
  makeSelectListRoles,
} from '../App/selectors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  module: {
    color: 'cyan',
  },
}));
function createData(name) {
  return { name };
}

const rows = [createData('Customer'), createData('Report')];

function Setting({ role, userRoles, listRoles }) {
  const classes = useStyles();
  const [selectRole, setSelectRole] = React.useState('');
  const handleChange = event => {
    console.log(event.target.value);
    setSelectRole(event.target.value);
  };

  const renderListRoles = () => {
    return listRoles.map((item, index) => {
      return (
        <MenuItem value={item.role} key={index}>
          {item.role}
        </MenuItem>
      );
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectRole}
          onChange={handleChange}
        >
          {renderListRoles()}
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
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <CheckBox />
                </TableCell>
                <TableCell align="right">
                  <CheckBox />
                </TableCell>
                <TableCell align="right">
                  <CheckBox />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
  userRoles: makeSelectuserRoles(),
  listRoles: makeSelectListRoles(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(Setting);
