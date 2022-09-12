import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Signin from './user/Signin';
import Register from './user/Register';
import Cookies from 'universal-cookie';
import './App.css'
import Menu from './components/menu/Menu';
import {PrivateRoute} from './auth/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Items from './components/dashboard/dashboardComponents/Items';
import CreateItem from './components/dashboard/dashboardComponents/CreateItem';
import {isAuthenticated} from "./auth";
import UpdateItem from './components/dashboard/dashboardComponents/UpdateItem';
import Favorites from './components/favourites/Favorites'
import Cart from './components/cart/Cart';
import Item from './components/item/item';
export default function App() {

    return (
        <div>
            <BrowserRouter>
                <Menu/>
                <Routes>
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
                    <Route path='/' element={< Home />}/>
                    <Route
                        path="/item/:itemId"
                        element={< PrivateRoute > <Item/> </PrivateRoute>}/>
                    <Route
                        path="/favourites"
                        element={< PrivateRoute > <Favorites/> </PrivateRoute>}/>
                    <Route
                        path="/cart"
                        element={< PrivateRoute > <Cart/> </PrivateRoute>}/>
                    <Route
                        path='/signin'
                        element={isAuthenticated()
                        ? < Home />:< Signin />}/>
                    <Route path='/register' element={< Register />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
