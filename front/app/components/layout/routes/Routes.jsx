import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch } from 'react-router-dom';
import { map, isEmpty } from 'ramda';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import AppRoute from 'components/layout/appRoute/AppRoute';

import NotFoundPage from 'components/pages/notFoundPage/NotFoundPage';

import history from 'constants/history';
import routes from 'constants/routes';

const Routes = () => (

    <ConnectedRouter history={history}>
        <Switch>
            {
                map(routeProps => (
                    <AppRoute
                        key={routeProps.path}
                        {...routeProps}
                    />
                ), routes)
            }
            <AppRoute
                path='*'
                component={NotFoundPage}
            />
        </Switch>
    </ConnectedRouter>
);

function mapStateToProps(state) {
    const { loaders } = state;

    return {
        isLoading: !isEmpty(loaders)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            // checkAuthorized
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

