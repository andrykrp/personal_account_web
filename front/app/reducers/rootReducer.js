import { combineReducers } from 'redux';
import { routerMiddleware as router } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';

import application from './application';
import registration from './registration';
import timer from './timer';
import currencies from './currencies';

const rootReducer = combineReducers({
    registration,
    application,
    timer,
    router,
    notifications,
    currencies
});

export default rootReducer;
