import request from '../../utils/request';
import { SHOW_LOADER, HIDE_LOADER, SET_CODE } from '../../constants/actionTypes';
import { VERIFICATION } from '../../constants/loaders';

export default function verificationCheck(phone, code, type) {
    return dispatch => {
        dispatch({type: SHOW_LOADER, id: VERIFICATION});

        return request({
            url: '/api/verification/check',
            method: 'POST',
            data: {
                type,
                phone,
                code
            }
        }).then(() => {
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
