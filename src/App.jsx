import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Signin from './user/Signin';
import Register from './user/Register';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import './App.css'
import UserInfo from './user/UserInfo';
import Menu from './components/menu/Menu';
import Categories from './components/categories/Categories';
import {PrivateRoute} from './auth/PrivateRoute';
import Dashboard from './components/Dashboard';
const cookies = new Cookies();
export default function App() {
    const [user,
        setUser] = useState(null)
    let token = cookies.get('token')
    if (token) {
        var decoded = jwt_decode(token);
        console.log(decoded);
    }
    useEffect(() => {
        if (decoded) {
            setUser(decoded)
        }
    }, []);
    return (
        <div>
            <BrowserRouter>
                <Menu/>
                <Categories/> {/* <Header user={user}/> */}
                {/* <Menu/> */}
                <Routes>
                <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/signin'
                        element={user
                        ? < Home />:< Signin />}/>
                    <Route path='/register' element={< Register />}/>
                    <Route path='/' element={< Home />}/>
                    <Route
                        path='/userinfo'
                        element={user
                        ? <UserInfo user={user}/>
                        : < Signin />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
