import React, { useState } from 'react';
import './Header.css';

function Header({ isLoggedin, handleSignInModal, handleLogOut }) {
  return (
    <header className='header'>
      <div className='header__content'>
        <h1 className='header__title'>Budgetly</h1>
        <p className='header__welcome'>Hello, user</p>
        <div className='header__buttons'>
          {isLoggedin ? (
            <button className='header__logout-btn' onClick={handleLogOut}>
              Log Out
            </button>
          ) : (
            <button className='header__login-btn' onClick={handleSignInModal}>
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
