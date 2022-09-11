import React from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie';
import {signout, isAuthenticated} from "../auth"
const cookies = new Cookies();

export default function Header({user}) {
    const signout = () => {
        cookies.remove('token')
        window
            .location
            .reload(false);
    }
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark d-flex">
            <Link to={"/"} className="navbar-brand">
                Topzonez
            </Link>
            <div className="navbar-nav mr-auto">
                <div className="navbar-na">
                    <div className="navbar-nav">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/protected"} className="nav-link">
                                Protected
                            </Link>
                        </li>
                        {user?
                        <li className="nav-item">
                            <Link to="/userinfo" className="nav-link">
                                Userinfo
                            </Link>
                        </li>:null
                        }
                    </div>
                </div>
            </div>
            <div className="navbar-nav ml-auto">  
                {user
                    ? <div className="navbar-nav mr-1">
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link" onClick={signout}>
                                    Sign Out
                                </Link>
                            </li>

                        </div>
                    : null
}
                {user
                    ? null
                    : <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/signin"} className="nav-link">
                                Log In
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/signup"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
}
            </div>
        </nav>
    )
}
