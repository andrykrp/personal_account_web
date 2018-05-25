import {SET_TIMER} from '../constants/actionTypes';

function getInitialState() {
    return {
        timer: null
    };
}

export default ((state = getInitialState(), {type, ...payload}) => {
    switch (type) {
        case SET_TIMER:
            return {
                ...state,
                timer: payload.timer
            };
        default:
            return state;
    }
});