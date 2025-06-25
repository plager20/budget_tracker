import './Header.css';

function Header({ isLoggedin, handleSignInModal, handleLogOut, currentUser }) {
  return (
    <header className='header'>
      <div className='header__content'>
        <h1 className='header__title'>Spendly</h1>
        {isLoggedin ? (
          <p className='header__welcome'>Hello, {currentUser.name}</p>
        ) : (
          <p className='header__welcome'>Welcome</p>
        )}

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
