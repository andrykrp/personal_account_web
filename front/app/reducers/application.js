import { SET_WALLET_NUMBER, SET_AUTHORIZED, SET_USER } from '../constants/actionTypes';

function getInitialState() {
    return {
        walletNumber: null,
        authorized: false,
        user: {}
    };
}

export default ((state = getInitialState(), { type, ...payload }) => {
    switch (type) {
        case SET_WALLET_NUMBER:
            return {
                ...state,
                walletNumber: payload.walletNumber
            };
        case SET_AUTHORIZED:
            return {
                ...state,
                authorized: payload.authorized
            };
        case SET_USER:
            return {
                ...state,
                user: payload.user
            };
        default:
            return state;
    }
});