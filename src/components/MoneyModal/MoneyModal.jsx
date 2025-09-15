import React, { useState } from 'react';
import './MoneyModal.css';

function MoneyModal({ closeActiveModal, isOpen, onAddItem }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  const incomeCategories = ['Work', 'Freelance', 'Investment', 'Other'];
  const expenseCategories = [
    'Food',
    'Rent',
    'Bills',
    'Entertainment',
    'Transport',
    'Shopping',
    'Other',
  ];

  const handleNameChange = (e) => setName(e.target.value);

  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setCategory(''); // reset category when switching type
  };

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const resetForm = () => {
    setName('');
    setAmount('');
    setType('');
    setCategory('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, type, category, amount: Number(amount) });
    closeActiveModal();
    resetForm();
  };

  const availableCategories =
    type === 'income'
      ? incomeCategories
      : type === 'expense'
      ? expenseCategories
      : [];

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
            {/* Transaction Type */}
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
                checked={type === 'income'}
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
                checked={type === 'expense'}
                onChange={handleTypeChange}
              />
              Expense
            </label>
          </fieldset>

          {/* Transaction Name */}
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

          {/* Transaction Amount */}
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

          {/* Transaction Category */}
          {type && (
            <label htmlFor='category' className='moneyModal__label'>
              Category
              <select
                id='category'
                className='moneyModal__input'
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value='' disabled>
                  Select category
                </option>
                {availableCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          )}

          <button type='submit' className='moneyModal__submit'>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default MoneyModal;
