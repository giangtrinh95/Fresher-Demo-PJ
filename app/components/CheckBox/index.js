import React, { useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Checkbox } from '@material-ui/core';
export default function CheckBoxSetting({ role, selectRoles }) {
  const renderCheckBox = () => {
    // const keyName = Object.keys(selectRoles[0].permissions);
    return selectRoles.map(item => {
      return item.permissions.map((check, index) => {
        return role ? (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {check.module}
            </TableCell>
            <TableCell align="right">
              <Checkbox checked={selectRoles.length > 0 ? check.view : false} />
            </TableCell>
            <TableCell align="right">
              <Checkbox
                checked={selectRoles.length > 0 ? check.update : false}
              />
            </TableCell>
            <TableCell align="right">
              <Checkbox
                checked={selectRoles.length > 0 ? check.export : false}
              />
            </TableCell>
          </TableRow>
        ) : null;
      });
    });
  };
  return <>{renderCheckBox()}</>;
}
