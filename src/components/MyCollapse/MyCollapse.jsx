import React, { useState } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const MyCollapse = () => {
  const [activeKey, setActiveKey] = useState([]);
  const text = `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`;

  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Collapse activeKey={activeKey} onChange={onChange} accordion>
      <Panel header="This is panel header 1" key="1">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};

export default MyCollapse;
