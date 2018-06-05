import {SET_PHONE, SET_CODE, RESET_REGISTRATION} from '../constants/actionTypes';

function getInitialState() {
    return {
        phone: null,
        code: null
    };
}

export default ((state = getInitialState(), {type, ...payload}) => {
    switch (type) {
        case SET_PHONE:
            return {
                ...state,
                phone: payload.phone
            };
        case SET_CODE:
            return {
                ...state,
                code: payload.code
            };
        case RESET_REGISTRATION:
            return {
                ...state,
                phone: null,
                code: null
            };
        default:
            return state;
    }
});