import {  ROUTING } from 'constants/actionTypes';

export default function(url) {
    return dispatch => {

        dispatch({
            type: ROUTING,
            payload: {
                method: 'push',
                nextUrl: url
            }
        });
    };
}
