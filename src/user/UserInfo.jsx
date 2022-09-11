import React from 'react'

export default function UserInfo({user}) {
    return (
        <div className="card" style={{width: '18rem'}}>
            <img  className="card-img-top profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt='ddd'/>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{user.email}</li>
                    <li className="list-group-item">role: user</li>
                    <li className="list-group-item">id: {user._id}</li>
                </ul>

            </div>

    );}