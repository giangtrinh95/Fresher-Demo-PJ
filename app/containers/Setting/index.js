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
import { makeSelectRole, makeSelectuserRoles } from '../App/selectors';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function createData(name) {
  return { name };
}

const rows = [
  createData('Frozen yoghurt'),
  createData('Ice cream sandwich'),
  createData('Eclair'),
];

function Setting({ role, userRoles }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Module</TableCell>
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
  );
}

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
  userRoles: makeSelectuserRoles(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(Setting);
