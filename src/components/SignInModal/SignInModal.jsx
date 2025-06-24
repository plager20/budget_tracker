import React, { useState } from 'react';
import './SignInModal.css';

function SignInModal({
  closeActiveModal,
  isOpen,
  handleLogIn,
  handleSignUpModal,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogIn({ email, password });
    resetForm();
  };

  return (
    <div className={`signInModal ${isOpen ? 'signInModal_opened' : ''}`}>
      <div className='signInModal__content'>
        <button
          className='signInModal__close'
          onClick={closeActiveModal}
        ></button>
        <form className='signInModal__Form' onSubmit={handleSubmit}>
          <h2 className='signInModal__title'>Log In</h2>
          <label htmlFor='signin-email' className='signInModal__label'>
            Email
            <input
              type='email'
              className='signInModal__input'
              id='signin-email'
              placeholder='email'
              minLength='1'
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <label htmlFor='signin-password' className='signInModal__label'>
            Password
            <input
              type='password'
              className='signInModal__input'
              id='signin-password'
              placeholder='password'
              minLength='1'
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button type='submit' className='signInModal__submit'>
            Log In
          </button>
          <span className='signInModal__span'>
            or{' '}
            <button
              type='button'
              className='signInModal__redirect'
              onClick={handleSignUpModal}
            >
              register here
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignInModal;
