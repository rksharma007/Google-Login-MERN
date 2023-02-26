import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = ({ alerts }) =>
    (alerts && alerts.length > 0 && alerts.map(alert => {
    return(
    <div>
        {alert.alertType === 'danger' && toast.error(alert.msg)}
        {alert.alertType === 'success' && toast.success(alert.msg)}
        <ToastContainer limit={1} autoClose={4000} position={toast.POSITION.BOTTOM_RIGHT} />
    </div>
    )
}));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);