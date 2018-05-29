import {SET_LIST_CURRENCIES} from '../constants/actionTypes';

function getInitialState() {
    return {
        listCurrencies: []
    };
}

export default ((state = getInitialState(), {type, ...payload}) => {
    switch (type) {
        case SET_LIST_CURRENCIES:
            return {
                ...state,
                listCurrencies: payload.listCurrencies
            };
        default:
            return state;
    }
});