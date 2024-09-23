import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';

const plainOptions = ['Apple'];

const CheckboxSelectodo = () => {
  const [checkedList, setCheckedList] = useState(['Apple']);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onCheckAllChange = (e) => {
    const checked = e.target.checked;
    setCheckedList(checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(checked);
  };

  const onChange = (list) => {
    setCheckedList(list);
  };

  useEffect(() => {
    setIndeterminate(!!checkedList.length && checkedList.length < plainOptions.length);
    setCheckAll(checkedList.length === plainOptions.length);
  }, [checkedList]);

  return (
    <div >
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
      </Checkbox>
    </div>
  );
};

export default CheckboxSelectodo;







