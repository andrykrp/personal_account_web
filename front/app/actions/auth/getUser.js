import { SET_USER } from '../../constants/actionTypes';
import request from '../../utils/request';

export default function getUser() {
    return dispatch => {

        return request({
            url: '/api/user/me',
            method: 'GET'
        }).then(response => {

            return dispatch({
                type: SET_USER,
                user: response.data
            });

        }).catch(error => {
            throw error;

            return dispatch({
                type: SET_USER,
                user: {}
            });
        });
    };
}