import React, { useState } from 'react';
import './SignUpModal.css';

function SignUpModal({ closeActiveModal, isOpen, handleRegistration }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ name, email, password });
    resetForm();
  };

  return (
    <div className={`signUpModal ${isOpen ? 'signUpModal_opened' : ''}`}>
      <div className='signUpModal__content'>
        <button
          className='signUpModal__close'
          onClick={closeActiveModal}
        ></button>
        <form className='signUpModal__Form' onSubmit={handleSubmit}>
          <h2 className='signUpModal__title'>Register</h2>
          <label htmlFor='signup-name' className='signUpModal__label'>
            Name
            <input
              type='text'
              className='signUpModal__input'
              id='signup-name'
              placeholder='Name'
              minLength='1'
              maxLength='30'
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label htmlFor='signup-email' className='signUpModal__label'>
            Email
            <input
              type='email'
              className='signUpModal__input'
              id='signup-email'
              placeholder='email'
              minLength='1'
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <label htmlFor='signup-password' className='signUpModal__label'>
            Password
            <input
              type='password'
              className='signUpModal__input'
              id='signup-password'
              placeholder='password'
              minLength='1'
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button type='submit' className='signUpModal__submit'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
