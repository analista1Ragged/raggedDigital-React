import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const Paginacion = ({ 
  currentPage, 
  pageSize, 
  totalItems, 
  onChangePage, 
  className 
}) => {
  return (
    <div className={`paginacion ${className || ''}`}>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={onChangePage}
        pageSizeOptions={['10', '20', '30', '50', '100']}
        showSizeChanger
        showQuickJumper
      />
    </div>
  );
};

Paginacion.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Paginacion;


