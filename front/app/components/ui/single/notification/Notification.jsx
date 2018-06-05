import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

class Notification extends PureComponent {
    static propTypes = {
        notifications: PropTypes.array
    };

    render() {
        const { notifications } = this.props;

        return (
            <Notifications
                notifications={notifications}
            />
        );
    }
}

export default connect(
    state => ({ notifications: state.notifications })
)(Notification);