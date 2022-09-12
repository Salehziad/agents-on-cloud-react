import axios from'axios'

export const getItems = () => {
    return fetch(`http://localhost:5000/items`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getOneItem=async(itemId)=>{
        const result = await axios.get(`http://localhost:5000/items/${itemId}`, {
        });
        return result.data
}

export const createItem=async(userId,token,data)=>{
    const result = await axios.post(`http://localhost:5000/items/${userId}`, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return result
}

export const getUserItems=async(userId,token)=>{
    try {
        const resp = await axios.get(`http://localhost:5000/items/userItems/${userId}`, {
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

export const updateItem=async(userId,itemId,token,data)=>{
    console.log(userId,itemId,token,data);
    const result = await axios.put(`http://localhost:5000/items/${itemId}/${userId}`, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    console.log(result);
    return result
}

export const deleteItem=async(itemId,userId,token)=>{
    console.log(userId,itemId,token);
    const result = await axios.delete(`http://localhost:5000/items/${itemId}/${userId}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    console.log(result);
    return result
}