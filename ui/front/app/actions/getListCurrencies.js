import CookiesActions from 'js-cookie';

import request from '../utils/request';

export default function getListCurrencies() {
    return dispatch => {
        return request({
            url: 'http://private-1ab5c-ubcoin.apiary-mock.com/list/currency',
            method: 'GET'
        }).then(response => {
            console.log(response);
            CookiesActions.set('listCurrencies', response, { expires: 1 });
            return response;
        }).catch(error => {
            throw error;
        });
    };
}
