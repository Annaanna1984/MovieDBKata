import React from 'react';
import { Alert } from 'antd';
import './MyAlert.css';
import PropTypes from 'prop-types';

export default class MyAlert extends React.Component {
    render() {
        const { message } = this.props;
        return <Alert message="Error" description={message} type="error" showIcon />;
    }
}
MyAlert.propTypes = {
    message: PropTypes.string
};
MyAlert.defaultProps = {
    message: ''
};
