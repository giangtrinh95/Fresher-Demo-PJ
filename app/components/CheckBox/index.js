import { Checkbox } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
function CheckBoxSetting({ role, handleChange, moduleRoles }) {
  const renderCheckBox = () => {
    return moduleRoles.map((item, index) => {
      return role ? (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            {item.module}
          </TableCell>
          <TableCell align="right">
            <Checkbox
              name={item.module}
              value="view"
              checked={item.permissions.view}
              onChange={handleChange}
            />
          </TableCell>
          <TableCell align="right">
            <Checkbox
              name={item.module}
              value="update"
              checked={item.permissions.update}
              onChange={handleChange}
            />
          </TableCell>
          <TableCell align="right">
            <Checkbox
              name={item.module}
              value="export"
              checked={item.permissions.export}
              onChange={handleChange}
            />
          </TableCell>
        </TableRow>
      ) : null;
    });
  };
  return <>{renderCheckBox()}</>;
}
export default React.memo(CheckBoxSetting);
