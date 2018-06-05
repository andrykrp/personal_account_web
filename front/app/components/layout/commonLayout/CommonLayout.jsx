import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Translate from '../../decorators/Translate';

import Header from '../../ui/common/header/Header';
import Menu from '../../ui/common/menu/Menu';

import getListCurrencies from '../../../actions/getListCurrencies';
import checkAuthorized from '../../../actions/auth/checkAuthorized';
import getUser from '../../../actions/auth/getUser';

import styles from './CommonLayout.pcss';

const styleContext = classNames.bind(styles);

@Translate()
class CommonLayout extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        showHeader: PropTypes.bool,
        menuAvailable: PropTypes.bool,
        title: PropTypes.string
    };

    state = {
        showMenu: false
    };

    componentDidMount() {
        /* if (!CookiesActions.get('listCurrencies')) {
             this.props.actions.getListCurrencies();
         }*/
        this.props.actions.checkAuthorized().then(() => {
            this.props.actions.getUser();
        });
    }

    handleShowMenu = () => {
        this.setState({
            showMenu: true
        });
        document.body.style.overflowY = 'hidden';
    };

    handleCloseMenu = () => {
        this.setState({
            showMenu: false
        });
        document.body.style.overflowY = 'auto';
    };

    render() {
        const
            { children, showHeader, user, title, translate: t, authorized } = this.props,
            { showMenu } = this.state;

        const wrapperClasses = styleContext({
            wrapper: true,
            wrapperNoPadding: !(showHeader && authorized),
            noScroll: showMenu
        });

        return (
            <div className={wrapperClasses}>
                {
                    showHeader && authorized && (
                        <Header
                            buttonClick={this.handleShowMenu}
                            title={t(title)}
                            typeButton='menu' />
                    )
                }
                {
                    showMenu && (
                        <Menu onClickEmptySpace={this.handleCloseMenu} user={user.walletNumber} />
                    )
                }
                {children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { application: { walletNumber, user, authorized } } = state;

    return {
        walletNumber,
        user,
        authorized
    };
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

