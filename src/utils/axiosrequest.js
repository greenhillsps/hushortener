import 'whatwg-fetch';
import axios from 'axios';
import LocalStorageIO from './LocalStorageIO'

axios.defaults.headers.common['Authorization'] = LocalStorageIO.getToken(); //if user already logged in then header will be set from here, if user logged in thorugh login screen then header will be set from login function

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {

    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

const axiosrequest = {

    /**
     * Requests a URL, returning a promise
     *
     * @param  {string} url       The URL we want to request
     *
     * @return {object}           The response data
     */
    get(url) {
        return axios.get(url)
            .then(checkStatus)

    },

    /**
     * Requests a URL, returning a promise
     *
     * @param  {string} url       The URL we want to request
     * @param  {object} [data] The options we want to pass to "fetch"
     *
     * @return {object}           The response data
     */
    
    post(url, data) {
        return axios.post(url, data,)
            .then(checkStatus);
    },

     put(url, data) {

        return axios.put(url, data)
            .then(checkStatus);
    },

    delete(url){
        return axios.delete(url)
        .then(checkStatus)
    },
}

export default axiosrequest;