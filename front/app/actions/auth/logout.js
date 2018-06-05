import request from '../../utils/request';
import { SHOW_LOADER, HIDE_LOADER, SET_USER } from '../../constants/actionTypes';
import { SIGN_OUT } from '../../constants/loaders';

export default function logout() {
    return dispatch => {
        dispatch({type: SHOW_LOADER, id: SIGN_OUT});

        return request({
            url: '/api/auth/logout',
            method: 'POST'
        }).then(() => {
            dispatch({
                type: SET_USER,
                user: {}
            });

            return dispatch({type: HIDE_LOADER, id: SIGN_OUT});

        }).catch(error => {
            dispatch({ type: HIDE_LOADER, id: SIGN_OUT });

            throw error;
        });
    };
}
