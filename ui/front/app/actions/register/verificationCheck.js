import request from '../../utils/request';
import { SHOW_LOADER, HIDE_LOADER, SET_CODE } from '../../constants/actionTypes';
import { VERIFICATION } from '../../constants/loaders';

export default function verificationCheck(phone, code) {
    return dispatch => {
        dispatch({type: SHOW_LOADER, id: VERIFICATION});

        return request({
            url: '/api/verification/check',
            method: 'POST',
            data: {
                'type': 'REGISTRATION',
                phone,
                code
            }
        }).then(response => {
            dispatch({type: HIDE_LOADER, id: VERIFICATION});

            return dispatch({
                type: SET_CODE,
                code: code
            });

        }).catch(error => {
            dispatch({ type: HIDE_LOADER, id: VERIFICATION });

            throw error;
        });
    };
}
