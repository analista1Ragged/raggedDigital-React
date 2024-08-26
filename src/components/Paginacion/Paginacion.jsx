import React from 'react';
import { Pagination } from 'antd';

const Paginacion = ({ currentPage, pageSize, data, handleChangePage }) => {
  return (
    <Pagination
      current={currentPage}
      pageSize={pageSize}
      total={data.length}
      onChange={handleChangePage}
      pageSizeOptions={['10', '20', '30','50','100']}
      showSizeChanger
      showQuickJumper
    />
  );
};

export default Paginacion;


