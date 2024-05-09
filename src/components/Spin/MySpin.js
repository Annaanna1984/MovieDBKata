import { Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import React from 'react';

import './MySpin.css';

Spin.setDefaultIndicator(<Loading3QuartersOutlined spin />);

const MySpin = () => {
    return <Spin size="large" spinning={true} className="spin" />;
};

export default MySpin;
