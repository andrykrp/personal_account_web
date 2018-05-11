import axios from 'axios';
import { pathOr } from 'ramda';

import store from 'store/store';

import { API_HOST } from 'constants/environment';

const defaultWaitResponseTimeout = 10 * 1000;

function buildHeaders(headers = {}) {
    // const token = pathOr('', ['auth', 'token'], store.getState());

    // return token ? {
    //     ...headers,
    //     'X-XSRF-TOKEN': token
    // } : {
    //     ...headers
    // };

    return {
        ...headers
    };
}

export default function baseRequest(params) {
    return axios({
        timeout: pathOr(defaultWaitResponseTimeout, ['application', 'waitResponseTimeout'], store.getState()),
        ...params,
        url: `${API_HOST}${params.url}`,
        headers: buildHeaders(params.headers)
        // withCredentials: true
    });
};
