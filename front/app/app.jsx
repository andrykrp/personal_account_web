import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'store/store';
import Routes from 'components/layout/routes/Routes';

import './i18n';

function render(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
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
