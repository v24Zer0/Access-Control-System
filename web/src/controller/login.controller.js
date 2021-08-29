/**
 * Validates user details through API. 
 * @param {Object} userDetails Contains details of the user, namely username and password
 * @returns {boolean} True if details are valid, False if anything went wrong
 */

import route from "../utility/url";

async function validLogin(username, password) {
    try {
        const res = await fetch(route.login, {
            method: 'post',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'            
            },
            body: JSON.stringify({ username: username, password: password })
        });
        const data = await res.json();
        if(res.status === 200) {
            localStorage.setItem('token', data.token);
            return {
                success: true,
                message: ''
            }
        } else {
            return {
                success: false,
                message: data.message
            }
        }
    } catch(error) {
        return {
            success: false,
            message: 'Something went wrong'
        };
    }
}

export {validLogin};