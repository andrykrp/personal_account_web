import { success, error, warning, info } from 'react-notification-system-redux';

const types = {
    success,
    error,
    warning,
    info
};

export default function show(notificationDetails, type) {
    const notificationMethod = types[type] || types.info;

    return dispatch => {
        return dispatch(notificationMethod(notificationDetails));
    };
}
