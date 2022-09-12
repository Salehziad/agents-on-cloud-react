import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const signup = user => {
    return fetch(`https://store-server-saleh.herokuapp.com/api/v1/users/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const signin = async(user) => {
    return await fetch(`https://store-server-saleh.herokuapp.com/api/v1/users/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {

        return response.json();
    }).catch(err => {
        console.log(err);
    })
}

export const authenticate = (data, next) => {
    cookies.set('data', data, {path: '/'});
    window
        .location
        .reload();
    next();
};

export const signout = next => {
    cookies.remove('data', {path: '/'})
    window
        .location
        .reload();

};

export const isAuthenticated = () => {
    if (cookies.get('data') === 'undefined') {
        return false;
    }
    if (cookies.get('data')) {
        return cookies.get('data');
    } else {
        return false;
    }
};


