import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';

import styles from './Countdown.pcss';

function getCountdownValue(target) {
    let distance = target - new Date().getTime();

    let minutes = Math.floor(distance / 1000 / 60);
    let seconds = Math.round((distance % (1000 * 60)) / 1000);

    if (seconds === 60) {
        minutes += 1;
        seconds = 0;
    }

    return addLeadingZero(minutes) + ':' + addLeadingZero(seconds);
}

function addLeadingZero(value) {
    if (value.toString().length === 1) {
        return '0' + value;
    }

    return value;
}

export default class Countdown extends PureComponent {
    static propTypes = {
        target: PropTypes.number,
        onExpired: PropTypes.func
    };

    state = {
        expired: this.props.target <= new Date().getTime(),
        value: getCountdownValue(this.props.value)
    };

    componentDidMount() {
        if (!this.props.target) {
            return;
        }

        this.checkTime();

        if (this.state.expired === false) {
            this.intervalId = setInterval(this.checkTime, 500);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.target && nextProps.target) {
            this.checkTime();

            if (this.state.expired === false) {
                this.intervalId = setInterval(this.checkTime, 500);
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    checkTime = () => {
        const { target, onExpired } = this.props;

        if (target <= new Date().getTime()) {
            this.setState({
                expired: true
            }, onExpired);
        } else {
            this.setState({
                value: getCountdownValue(target)
            });
        }
    };

    render() {
        const { target } = this.props;
        const { expired, value } = this.state;

        return !expired && !!target && (
            <span className={styles.label}>
                {value}
            </span>
        );
    }
}