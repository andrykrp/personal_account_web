import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginPage from '../loginPage/LoginPage';

import redirect from '../../../actions/redirect';
import logout from '../../../actions/auth/logout';
import getUser from '../../../actions/auth/getUser';
import checkAuthorized from '../../../actions/auth/checkAuthorized';
import Translate from '../../decorators/Translate';

import styles from './HomePage.pcss';

@Translate()
class HomePage extends PureComponent {

    static propTypes = {
        user: PropTypes.object,
        authorized: PropTypes.bool
    };

    static componentDidMount() {
        /*if (!isNotEmpty(this.props.user)) {
            this.props.actions.redirect('/login');
        }*/
        /* this.props.actions.checkAuthorized().catch(() => {
             this.props.actions.redirect('/login');
         });*/
    };

    handleLogout = () => {
        this.props.actions.logout().then(() => {
            this.props.actions.redirect('/login');
        });
    };

    handleLogin = () => {
        this.props.actions.redirect('/login');
    };

    render() {
        const { authorized, user, translate: t } = this.props;

        return (

            authorized && (
                <div className={styles.wrapper}>

                    <div className={styles.wrapperHexagon}>
                        <img className={styles.hex} src='/img/hex.svg' alt='' />
                    </div>

                    <div className={styles.smallText}>
                        Пользователь: {user.phone}
                    </div>
                    <button className={styles.button} onClick={this.handleLogout}>Выход</button>


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
            ) || (
                <LoginPage />
            )
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

