import React from 'react';
import { Typography } from 'antd';

export default function MyHeader() {
    const { Title } = Typography;
    // const classes = useStyles();
    return (
        <Title level={1} style={{ color: 'white', textAlign: 'center', fontWeight: 'bolder' }}>
            Quiz App
        </Title>
    );
}
