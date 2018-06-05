import request from '../utils/request';
import { SET_LIST_CURRENCIES } from '../constants/actionTypes';

export default function getListCurrencies() {
    return dispatch => {
        return request({
            url: '/api/currencies',
            method: 'GET'
        }).then(response => {
            return dispatch({
                type: SET_LIST_CURRENCIES,
                listCurrencies: response.data
            });
        }).catch(error => {
            throw error;
        });
    };
}
