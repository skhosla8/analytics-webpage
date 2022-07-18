import React from 'react';
import logo from '../assets/logo-white.png';
import user from '../assets/user.png';

function Header() {
    return (
        <div className="header">
            <div>
                <img src={logo} alt="logo" className="header__logo" />
            </div>

            <div className="header__user">
                <img src={user} alt="user" />
                <span>John Doe</span>
                <button>
                    <i className="fa-solid fa-angle-down fa-md"></i>
                </button>
            </div>

        </div>
    )
}

export default Header; 