import React from 'react';
import { Pagination } from 'antd';

const Paginacion = () => {
  return (
    <div id="components-pagination-demo-mini">
      <Pagination size="small" total={20} />
      <Pagination size="small" total={20} showSizeChanger showQuickJumper />
      <Pagination
        size="small"
        total={20}
        showTotal={(total, range) => `Total ${total} items`}
      />
    </div>
  );
};

export default Paginacion;
