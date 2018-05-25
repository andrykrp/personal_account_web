import { find, propEq } from 'ramda';

import request from '../../utils/request';

import showNotification from '../notification/show';

import { SHOW_LOADER, HIDE_LOADER, SET_PHONE } from '../../constants/actionTypes';
import { VERIFICATION } from '../../constants/loaders';

export default function verification(phone) {
    return dispatch => {
        dispatch({ type: SHOW_LOADER, id: VERIFICATION });

        return request({
            url: '/api/verification/registration',
            method: 'POST',
            data: {
                'type': 'REGISTRATION',
                'phone': phone
            }
        }).then(response => {
            dispatch({ type: HIDE_LOADER, id: VERIFICATION });

            return dispatch({
                type: SET_PHONE,
                phone: phone
            });

        }).catch(error => {
            if (find(propEq('message', 'validation.phone.not_unique'))(error.response.data.error.validation)) {
                dispatch(showNotification({
                    title: 'Ошибка',
                    message: 'Данный номер уже используется в системе',
                    autoDismiss: 3
                }, 'error'));
            }

            throw error;
        });
    };
}
