import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch } from 'react-router-dom';
import { map } from 'ramda';

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

export default Routes;
