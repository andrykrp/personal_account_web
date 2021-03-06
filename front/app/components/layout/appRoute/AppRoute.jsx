import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { I18n, translate } from 'react-i18next';

import CommonLayout from 'components/layout/commonLayout/CommonLayout';

class AppRoute extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        path: PropTypes.string,
        component: PropTypes.func,
        permissions: PropTypes.array,
        exact: PropTypes.bool,
        showHeader: PropTypes.bool,
        menuAvailable: PropTypes.bool
    };

    static defaultProps = {
        title: 'UBCoin',
        permissions: [],
        exact: true
    };

    render() {
        const
            { title, path, exact, component, showHeader, menuAvailable } = this.props,
            Component = component;

        return (
            <I18n ns='translations'>
                {
                    (t, { i18n }) => (
                        <Route
                            path={path}
                            exact={exact}
                            render={props => (
                                <CommonLayout
                                    {...props}
                                    title={title}
                                    showHeader={showHeader}
                                    menuAvailable={menuAvailable}
                                >
                                    {/*<div>
                                <h2>{t('title')}</h2>
                                <button onClick={() => i18n.changeLanguage('ru')}>ru</button>
                                <button onClick={() => i18n.changeLanguage('en')}>en</button>
                            </div>*/}
                                    <Component
                                        {...props}
                                        params={props.match.params}
                                    />
                                </CommonLayout>
                            )}
                        />
                    )
                }
            </I18n>
        );
    }
}

export default AppRoute;
