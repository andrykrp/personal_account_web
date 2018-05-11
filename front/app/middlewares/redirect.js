import * as routerActions from 'react-router-redux';

import { ROUTING } from 'constants/actionTypes';

const redirect = store => next => action => {
    if (action.type === ROUTING) {
        store.dispatch(routerActions[action.payload.method](action.payload.nextUrl));
    }

    return next(action);
};

export default redirect;
