import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers/rootReducer';
import redirect from '../middlewares/redirect';

import history from '../constants/history';

const buildPersistedReducer = rootReducer => persistReducer({
    storage,
    key: 'main'
}, rootReducer);

function configureStore() {
    const store = compose(
        applyMiddleware(thunkMiddleware),
        applyMiddleware(redirect),
        applyMiddleware(routerMiddleware(history))
    )(createStore)(
        buildPersistedReducer(rootReducer),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    if (module.hot) {
        module.hot.accept('reducers/rootReducer', () => {
            const nextRootReducer = buildPersistedReducer(require('reducers/rootReducer').rootReducer);

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

export const store = configureStore();
export const persistor = persistStore(store);
