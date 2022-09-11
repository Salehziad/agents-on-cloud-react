import React, {useState, useRef} from 'react'
import {Link} from 'react-router-dom';
import {signup} from '../auth/index';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {isEmail} from "validator";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default function Register() {
    const form = useRef();
    const [data,
        setData] = useState({name: '', email: '', password: '', error: '', success: false});
    const {name, email, password, success, error} = data;

    const handleChange = name => event => {
        setData({
            ...data,
            error: false,
            success:false,
            [name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signup({name, email, password}).then(data => {
            if (data.error) {
                setData({
                    ...data,
                    error: data.error,
                    success: false
                });
            } else {
                setData({
                    ...data,
                    success: true
                });
                event
                    .target
                    .reset();
            }
        })
    }

    const signUpForm = () => (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"/>

                <Form onSubmit={handleSubmit} ref={form}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={handleChange('name')}
                                value={name}
                                validations={[required, vusername]}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                onChange={handleChange('email')}
                                value={email}
                                validations={[required, validEmail]}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={handleChange('password')}
                                value={password}
                                validations={[required, vpassword]}/>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Sign Up</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )

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
    )

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{
            display: success
                ? ''
                : 'none'
        }}>
            New account has been created successfully. Please &nbsp;
            <Link to='/signin'>
                 Signin</Link>
        </div>
    )

    return (
        <div>
            {showSuccess()
}
            {showError()
}
            {signUpForm()
}
        </div>
    );
};