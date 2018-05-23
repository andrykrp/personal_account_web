import CookiesActions from 'js-cookie';
import { SET_WALLET_NUMBER } from '../constants/actionTypes';

function getInitialState() {
    return {
        walletNumber: null
    };
}

export default ((state = getInitialState(), { type, ...payload }) => {
    switch (type) {
        case SET_WALLET_NUMBER:
            return {
                ...state,
                walletNumber: payload.walletNumber
            };
        default:
            return state;
    }
});