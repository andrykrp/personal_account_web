import request from '../utils/request';
import { SET_FIND_GEO_LOCATION } from '../constants/actionTypes';

export default function findGeoLocation(value) {
    return dispatch => {
        return request({
            url: '/api/geo/find',
            method: 'POST',
            data: {
                address: value
            }
        }).catch(error => {
            throw error;
        });
    };
}
