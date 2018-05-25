import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CookiesActions from 'js-cookie';

import getListCurrencies from '../../../actions/getListCurrencies';
import checkAuthorized from '../../../actions/auth/checkAuthorized';
import getUser from '../../../actions/auth/getUser';

import styles from './CommonLayout.pcss';

class CommonLayout extends PureComponent {
    static propTypes = {
        children: PropTypes.node
    };

    componentDidMount() {
       /* if (!CookiesActions.get('listCurrencies')) {
            this.props.actions.getListCurrencies();
        }*/
        this.props.actions.checkAuthorized().then(() => {
            this.props.actions.getUser();
        });
    }

    render() {
        const { children } = this.props;

        return (
            <div className={styles.wrapper}>
                {children}
            </div>
        );
    }
}

function mapStateToProps() {

    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getListCurrencies,
            checkAuthorized,
            getUser
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonLayout);

