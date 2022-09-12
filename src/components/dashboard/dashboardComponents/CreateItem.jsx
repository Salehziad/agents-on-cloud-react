import React, {useState, useEffect} from 'react';
import FileBase64 from 'react-file-base64';
import {isAuthenticated} from '../../../auth';
import {createItem} from '../../../api/itemApi'
import {Link} from 'react-router-dom';
// import {createProduct, getCategories} from './apiAdmin';

export default function CreateItem() {
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
        redirectToProfile,
    } = item;

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

        createItem(user._id, token, item).then(data => {
            if (data.error) {
                setItem({
                    ...item,
                    error: data.error
                });
            } else {
                console.log('inside els')
                setItem({
                    ...item,
                    name: '',
                    description: '',
                    image: '',
                    price: '',
                    category:'',
                    location:'',
                    quantity: '',
                    loading: false,
                    createdProduct: data.data.name
                });
            }
            window.location.reload();
        });
    };
    console.log('sssss',item)

    const newItemForm = () => (
        <div className="container">
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

                <button className="btn btn-outline-primary">Create Item</button>
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
                is created!</h2>
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
