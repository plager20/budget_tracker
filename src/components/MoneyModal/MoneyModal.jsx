import React, { useState } from 'react';
import './MoneyModal.css';

function MoneyModal({ closeActiveModal, isOpen, onAddItem }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const resetForm = () => {
    setName('');
    setAmount('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, type, amount: Number(amount) });
    closeActiveModal();
    resetForm();
  };

  return (
    <div className={`moneyModal ${isOpen ? 'moneyModal_opened' : ''}`}>
      <div className='moneyModal__content'>
        <button
          className='moneyModal__close'
          onClick={closeActiveModal}
        ></button>
        <form className='moneyModal__Form' onSubmit={handleSubmit}>
          <h2 className='moneyModal__title'>Add Income/Expense</h2>
          <fieldset className='moneyModal__radio-buttons'>
            <legend className='moneyModal__legend'>
              Select the transaction type:
            </legend>
            <label
              htmlFor='income'
              className='moneyModal__label moneyModal__label_type_radio'
            >
              <input
                type='radio'
                name='amount-type'
                className='moneyModal__radio-input'
                id='income'
                value='income'
                onChange={handleTypeChange}
              />
              Income
            </label>
            <label
              htmlFor='expense'
              className='moneyModal__label moneyModal__label_type_radio'
            >
              <input
                type='radio'
                name='amount-type'
                className='moneyModal__radio-input'
                id='expense'
                value='expense'
                onChange={handleTypeChange}
              />
              Expense
            </label>
          </fieldset>
          <label htmlFor='name' className='moneyModal__label'>
            Name
            <input
              type='text'
              className='moneyModal__input'
              id='name'
              placeholder='Name'
              minLength='1'
              maxLength='30'
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label htmlFor='amount' className='moneyModal__label'>
            Amount
            <input
              type='number'
              className='moneyModal__input'
              id='amount'
              placeholder='Amount'
              minLength='1'
              value={amount}
              onChange={handleAmountChange}
            />
          </label>
          <button type='submit' className='moneyModal__submit'>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default MoneyModal;
