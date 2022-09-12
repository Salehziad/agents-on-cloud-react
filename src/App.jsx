import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Signin from './user/Signin';
import Register from './user/Register';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import './App.css'
import UserInfo from './user/UserInfo';
import Menu from './components/menu/Menu';
import {PrivateRoute} from './auth/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Items from './components/dashboard/dashboardComponents/Items';
import CreateItem from './components/dashboard/dashboardComponents/CreateItem';
import {isAuthenticated} from "./auth";
import UpdateItem from './components/dashboard/dashboardComponents/UpdateItem';
const cookies = new Cookies();
export default function App() {
    // const [user,     setUser] = useState(null) let token = cookies.get('token')
    // if (token) {     var decoded = jwt_decode(token);     console.log(decoded); }
    // useEffect(() => {     if (decoded) {         setUser(decoded)     } }, []);
    return (
        <div>
            <BrowserRouter>
                <Menu/>
                <Routes>
                    {/* <Route
                        path="/dashboard"
                        element={isAuthenticated()
                        ? < Dashboard />:< Signin />}/>  */}
                        <Route
                        path="/dashboard"
                        element={< PrivateRoute > <Dashboard/> </PrivateRoute>}/> 
                    <Route
                        path="/dashboard/items"
                        element={< PrivateRoute > <Items/> </PrivateRoute>}/>
                    <Route
                        path="/dashboard/createitem"
                        element={< PrivateRoute > <CreateItem/> </PrivateRoute>}/>
                    <Route
                        path="/dashboard/updateItem/:itemId"
                        element={< PrivateRoute > <UpdateItem/> </PrivateRoute>}/>
                    <Route
                        path='/signin'
                        element={isAuthenticated()
                        ? < Home />:< Signin />}/>
                    <Route path='/register' element={< Register />}/>
                    <Route path='/' element={< Home />}/>
                    <Route
                        path='/userinfo'
                        element={isAuthenticated()
                        ? <UserInfo user={isAuthenticated()}/>
                        : < Signin />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
