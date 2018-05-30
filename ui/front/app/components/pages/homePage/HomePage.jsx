import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'ramda';

import Header from '../../ui/common/header/Header';

import redirect from '../../../actions/redirect';
import logout from '../../../actions/auth/logout';
import getUser from '../../../actions/auth/getUser';
import checkAuthorized from '../../../actions/auth/checkAuthorized';

import styles from './HomePage.pcss';
import { isNotEmpty } from "../../../utils/lomda";

class HomePage extends PureComponent {

    static componentDidMount() {
        if (!isNotEmpty(this.props.user)) {
            this.props.actions.redirect('/login');
        }
        /* this.props.actions.checkAuthorized().catch(() => {
             this.props.actions.redirect('/login');
         });*/
    };

    handleLogout = () => {
        this.props.actions.logout();
    };

    handleLogin = () => {
        this.props.actions.redirect('/login');
    };

    render() {
        const { authorized, user } = this.props;

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            {
                                authorized && (
                                    <Header
                                        title={user.phone}
                                        typeButton='logout'
                                        buttonClick={this.handleLogout}
                                    />
                                ) || (
                                    <Header
                                        title={t('homePage.header')}
                                        typeButton='login'
                                        buttonClick={this.handleLogin}
                                    />
                                )
                            }
                            <div className={styles.wrapperHexagon}>
                                <img className={styles.hex} src='/img/hex.svg' alt='' />
                            </div>
                            <div className={styles.wrapperText}>
                                <h2 className={styles.header}>
                                    {t('homePage.header')}
                                </h2>
                                <p className={styles.smallText}>{t('homePage.desc')}</p>
                            </div>
                            <div className={styles.imgWrapper}>
                                <img className={styles.img} src='/img/in_developing.svg' alt='' />
                            </div>
                        </div>
                    )}
            </I18n>
        );
    }
}

function mapStateToProps(state) {
    const { application: { walletNumber, authorized, user } } = state;

    return {
        walletNumber,
        authorized,
        user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            redirect,
            logout,
            checkAuthorized,
            getUser
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

