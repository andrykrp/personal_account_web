import { combineReducers } from 'redux';
import { routerMiddleware as router } from 'react-router-redux';

import application from './application';

const rootReducer = combineReducers({
    application,
    router
});

export default rootReducer;
