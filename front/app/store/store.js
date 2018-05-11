import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from 'reducers/rootReducer';
import redirect from 'middlewares/redirect';

import history from 'constants/history';

function configureStore() {
    const store = compose(
        applyMiddleware(thunkMiddleware),
        applyMiddleware(redirect),
        applyMiddleware(routerMiddleware(history))
    )(createStore)(rootReducer);

    if (module.hot) {
        module.hot.accept('reducers/rootReducer', () => {
            const nextRootReducer = require('reducers/rootReducer').rootReducer;

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

export default configureStore();
