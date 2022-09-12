import axios from 'axios'

// items
export const getItems = () => {
    return fetch(`https://store-server-saleh.herokuapp.com/items`, {method: "GET"}).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const getOneItem = async(itemId) => {
    const result = await axios.get(`https://store-server-saleh.herokuapp.com/items/${itemId}`, {});
    return result.data
}

export const createItem = async(userId, token, data) => {
    const result = await axios.post(`https://store-server-saleh.herokuapp.com/items/${userId}`, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return result
}

export const getUserItems = async(userId, token) => {
    try {
        const resp = await axios.get(`https://store-server-saleh.herokuapp.com/items/userItems/${userId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (err) {
        console.error(err);
    }
}

export const updateItem = async(userId, itemId, token, data) => {
    console.log(userId, itemId, token, data);
    const result = await axios.put(`https://store-server-saleh.herokuapp.com/items/${itemId}/${userId}`, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    console.log(result);
    return result
}

export const deleteItem = async(itemId, userId, token) => {
    console.log(userId, itemId, token);
    const result = await axios.delete(`https://store-server-saleh.herokuapp.com/items/${itemId}/${userId}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return result
}

// favorites

export const getUserFavorites = async(userId, token) => {
    try {
        const resp = await axios.get(`https://store-server-saleh.herokuapp.com/favourites/${userId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (err) {
        console.error(err);
    }
}

export const addToFavourite = (itemId, userId, token) => {
    return fetch(`https://store-server-saleh.herokuapp.com/favourites/${itemId}/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const removeFromFavourite = (favouriteId, userId, token) => {
    console.log(favouriteId, userId, token)
    return fetch(`https://store-server-saleh.herokuapp.com/favourites/${favouriteId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

//cart getUserCart

export const getUserCart = async(userId, token) => {
    try {
        const resp = await axios.get(`https://store-server-saleh.herokuapp.com/cart/${userId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (err) {
        console.error(err);
    }
}

export const addToCart = (itemId, userId, token) => {
    return fetch(`https://store-server-saleh.herokuapp.com/cart/${itemId}/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const removeFromCart = (cartId, userId, token) => {
    console.log(cartId, userId, token)
    return fetch(`https://store-server-saleh.herokuapp.com/cart/${cartId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};