import request from '../../utils/request';
import { SHOW_LOADER, HIDE_LOADER } from '../../constants/actionTypes';
import { VERIFICATION } from '../../constants/loaders';

export default function verification(phone) {
    return dispatch => {
        dispatch({type: SHOW_LOADER, id: VERIFICATION});

        return request({
            url: 'https://ubcoin.garmash.org/api/verification',
            method: 'POST',
            data: {
                'type': 'REGISTRATION',
                'phone': phone
            }
        }).then(response => {
            return dispatch({type: HIDE_LOADER, id: VERIFICATION});

        }).catch(error => {
            dispatch({ type: HIDE_LOADER, id: VERIFICATION });

            throw error;
        });
    };
}
