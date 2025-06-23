import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className='header'>
      <div className='header__content'>
        <h1 className='header__title'>Budgetly</h1>
        <p className='header__welcome'>Hello, user</p>
        <div className='header__buttons'>
          <button className='header__logout-btn'>Log Out</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
