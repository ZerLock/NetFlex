import { isExpired } from 'react-jwt';

function isConnected() {
    if (!localStorage.getItem('user_token')) {
        return (false);
    } else {
        const isTokenExpired = isExpired(localStorage.getItem('user_token'));
        if (isTokenExpired)
            return (false);
        else
            return (true);
    }
}

export default isConnected;