import { SET_AUTHORIZED, SET_USER } from '../../constants/actionTypes';
import { SHOW_LOADER, HIDE_LOADER } from 'constants/actionTypes';
import request from '../../utils/request';

export default function checkAuthorized() {
    return dispatch => {
        dispatch({ type: SHOW_LOADER, id: SET_AUTHORIZED });

        return request({
            url: '/api/auth/check',
            method: 'GET'
        }).then(response => {
            dispatch({ type: HIDE_LOADER, id: SET_AUTHORIZED });

            return dispatch({
                type: SET_AUTHORIZED,
                authorized: true
            });

        }).catch(error => {
            dispatch({ type: HIDE_LOADER, id: SET_AUTHORIZED });

            dispatch({
                type: SET_AUTHORIZED,
                authorized: false
            });

            dispatch({
                type: SET_USER,
                user: {}
            });

            throw error;
        });
    };
}