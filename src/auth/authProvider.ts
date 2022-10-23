import {AUTH_CHECK, AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT} from 'react-admin';

export default (type: string, params: any) => {
    if (type === AUTH_LOGIN) {
        const { email, password } = params;
        const request = new Request('https://api.anime.wildwolves.live/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                localStorage.setItem('token', res.access_token);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        const token = localStorage.getItem('token');
        if (token) {
            Promise.resolve()
        } else {
            localStorage.removeItem('token');
            return  Promise.reject({ redirectTo: '/login' });
        }
    }
    return Promise.resolve();
}