import React, {useState, useEffect} from 'react';
import FileBase64 from 'react-file-base64';
import {isAuthenticated} from '../../../auth';
import {updateItem,getOneItem} from '../../../api/itemApi'
import { useParams } from 'react-router-dom';

// import {createProduct, getCategories} from './apiAdmin';

export default function UpdateItem({match}) {
    const { itemId } = useParams();
    const [item,
        setItem] = useState({
        name: '',
        description: '',
        price: '',
        categories: [
            'FOOD', 'ELECTRONICS', 'GAMES', 'FASHION'
        ],
        category: '',
        photo: '',
        location: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false
    });
    const {user, token} = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        location,
        loading,
        error,
        createdProduct,
    } = item;

        
    useEffect(() => {
        productData(itemId)
    }, []);

    function productData(id) {
       getOneItem(id).then(data => {
        if (data.error) {
            setItem({
                ...item,
                error: data.error
            });
        } else {
            setItem({
                ...item,
                name:data.name,
                description:data.description,
                price:data.price,
                location:data.location,
                category:data.category
            });
        }
    });
    }

    const handleChange = name => event => {
        const value = event.target.value;
        setItem({
            ...item,
            [name]: value,
            loading: false,
        createdProduct: '',
        });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setItem({
            ...item,
            error: '',
            loading: true
        });

        updateItem(user._id,itemId, token, item).then(data => {
            if (data.error) {
                setItem({
                    ...item,
                    error: data.error
                });
            } else {
                setItem({
                    ...item,
                    name: '',
                    description: '',
                    image: null,
                    price: '',
                    category:'',
                    location:'',
                    quantity: '',
                    loading: false,
                    createdProduct: data.data.name
                });
            }
        });
    };

    const newItemForm = () => (
        <div className="container">
            <h1>Update product</h1>
            <form className="mb-3" onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Image</label>
                    <FileBase64
                        required
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setItem({
                        ...item,
                        image: base64,
                    })}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                    required
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        value={name}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea
                    required
                        onChange={handleChange('description')}
                        className="form-control"
                        value={description}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input
                    required
                        onChange={handleChange('price')}
                        type="number"
                        className="form-control"
                        value={price}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Category</label>
                    <select onChange={handleChange('category')} className="form-control">
                        <option>Please select</option>
                        {categories && categories.map((c, i) => (
                            <option key={i} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="text-muted">Location</label>
                    <input
                    required
                        onChange={handleChange('location')}
                        type="text"
                        className="form-control"
                        value={location}/>
                </div>

                <button className="btn btn-outline-primary">Update Item</button>
            </form>
        </div>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{
            display: error
                ? ''
                : 'none'
        }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{
            display: createdProduct
                ? ''
                : 'none'
        }}>
            <h2>{`${createdProduct}`}
                is Updated!</h2>
        </div>
    );

    const showLoading = () => loading && (
        <div className="alert alert-success">
            <h2>Loading...</h2>
        </div>
    );

    return (
        <div>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newItemForm()}
        </div>
    );
};
