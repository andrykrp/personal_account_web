import request from '../../utils/request';
import { SHOW_LOADER, HIDE_LOADER } from '../../constants/actionTypes';
import { VERIFICATION } from '../../constants/loaders';

export default function verificationCheck(phone, code) {
    return dispatch => {
        dispatch({type: SHOW_LOADER, id: VERIFICATION});

        return request({
            url: 'http://ubcoin.garmash.org/api/verification/check',
            method: 'POST',
            data: {
                'type': 'REGISTRATION',
                phone,
                code
            }
        }).then(response => {
            return dispatch({type: HIDE_LOADER, id: VERIFICATION});

        }).catch(error => {
            dispatch({ type: HIDE_LOADER, id: VERIFICATION });

            throw error;
        });
    };
}
