import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {};

function Pagination({ offset, perPage, data }) {
  const slice = data.slice(offset, offset + perPage);

  const PageCount = Math.ceil(data.length / perPage);
  const orgTableData = data;
  const tableData = slice;
  return <div />;
}

export default Pagination;
