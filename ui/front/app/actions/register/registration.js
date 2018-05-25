import request from '../../utils/request';
import { SHOW_LOADER, HIDE_LOADER, SET_WALLET_NUMBER } from '../../constants/actionTypes';
import { VERIFICATION } from '../../constants/loaders';

export default function registration(phone, code, password) {
    return dispatch => {
        dispatch({type: SHOW_LOADER, id: VERIFICATION});

        return request({
            url: '/api/user/registration',
            method: 'POST',
            data: {
                phone,
                code,
                password
            }
        }).then(response => {
            dispatch({type: HIDE_LOADER, id: VERIFICATION});

            return dispatch({
                type: SET_WALLET_NUMBER,
                walletNumber: response.data.number
            });

        }).catch(error => {
            dispatch({ type: HIDE_LOADER, id: VERIFICATION });

            throw error;
        });
    };
}
