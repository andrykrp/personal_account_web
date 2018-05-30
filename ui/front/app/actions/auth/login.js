import request from '../../utils/request';
import { SHOW_LOADER, HIDE_LOADER } from 'constants/actionTypes';
import { SIGN_IN } from 'constants/loaders';

export default function register(login, password) {
    return dispatch => {
        dispatch({type: SHOW_LOADER, id: SIGN_IN});

        return request({
            url: '/api/auth',
            method: 'POST',
            data: {
                login,
                password
            }
        }).then(response => {
            return dispatch({type: HIDE_LOADER, id: SIGN_IN});

        }).catch(error => {
            dispatch({ type: HIDE_LOADER, id: SIGN_IN });



            throw error;
        });
    };
}
