import React from 'react';
import { CloudUploadOutlined, MoreOutlined, } from '@ant-design/icons';
import { FloatButton } from 'antd';

const Menu3Botones = () => (
  <>
    <div>
        <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            
        }}
        icon={<MoreOutlined  style={{ color: 'white' }} />}
        >
        <FloatButton
            style={{
            backgroundColor: '#28a745', // Color for the main button
            color: 'white',
            }}
        />
        <FloatButton
            icon={<CloudUploadOutlined />}
            title="Subir Archivo"
            style={{
            backgroundColor: '#1890ff', // Color for the upload button
            color: 'white',
            }}
        />
        </FloatButton.Group>
    </div>
  </>
);

export default Menu3Botones;
