import React, {useState, useRef} from "react";
import {Link, Navigate} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Cookies from 'universal-cookie';
import {signin, authenticate, isAuthenticated} from "../auth";
const cookies = new Cookies();

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default function Signin() {
    const form = useRef();
    const [loading,
        setLoading] = useState(false);
    const [data,
        setData] = useState({email: '', password: '', error: '', loading: false, reDirect: false});
    const {email, password, error, reDirect} = data;

    const signInForm = () => (
        <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"/>

            <Form onSubmit={handleSubmit} ref={form}>
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <Input
                        type="email"
                        className="form-control"
                        onChange={handleChange('email')}
                        value={email}
                        validations={[required]}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        className="form-control"
                        autoComplete="on"
                        onChange={handleChange('password')}
                        value={password}
                        validations={[required]}/>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                    </button>
                    <p>Don't have account?&nbsp;<Link to='/signup'>Signup</Link>
                    </p>
                </div>
            </Form>
        </div>
    )
    const handleChange = name => event => {
        setData({
            ...data,
            error: false,
            [name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        form
            .current
            .validateAll();
        setData({
            ...data,
            loading: true
        });
        signin({email, password}).then(response => {
            if (response.error) {
                setLoading(false);
                setData({
                    ...data,
                    error: response.error,
                    loading: false
                });
            } else {
                authenticate(response, () => {
                    setData({
                        ...data,
                        reDirect: true
                    });
                });
                // reDirectUsers();
            }
        })
    }

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

    const reDirectUsers = () => {
        if (reDirect) {
            return <Navigate to='/'/>
        }
    }

    return (
        <div className="col-md-12 mt-auto signin">
            {signInForm()}
            {showError()}
            {reDirectUsers()}
        </div>
    );
};
