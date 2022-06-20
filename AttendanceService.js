import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';

const attendanceService = {
    endpoint: `${API_HOST_PREFIX}/api/attendances`,
};

const getWorkShops = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${attendanceService.endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getCurrentWorkshops = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${attendanceService.endpoint}/current?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const update = (payload) => {
    const config = {
        method: 'PUT',
        url: `${attendanceService.endpoint}/${payload.id}`,
        withCredentials: true,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config)
        .then(() => {
            return payload;
        })
        .catch(onGlobalError);
};

export { getWorkShops, getSingleWorkShop, getCurrentWorkshops, update };
