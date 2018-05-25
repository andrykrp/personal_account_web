import { SET_TIMER } from '../constants/actionTypes';

export default function timer(value) {
    return dispatch => {
        return dispatch({
            type: SET_TIMER,
            timer: value
        });
    };
}
