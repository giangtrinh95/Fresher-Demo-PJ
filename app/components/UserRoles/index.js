import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function index() {
  return (
    <Checkbox
      checked={true}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
}
