import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'store/store';
import Routes from 'components/layout/routes/Routes';
import Notification from 'components/ui/single/notification/Notification';

import './i18n';

function render(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component />
                <Notification />
            </PersistGate>
        </Provider>,
        document.getElementById('root')
    );
}

render(Routes);

if (module.hot) {
    module.hot.accept('./components/layout/routes/Routes.jsx', () => {
        const nextRouters = require('./components/layout/routes/Routes.jsx').default;

        render(nextRouters);
    });
}
