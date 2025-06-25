import { useState, useEffect } from 'react';
import './EditTransactionModal.css';

function EditTransactionModal({
  closeActiveModal,
  isOpen,
  handleEditItem,
  transaction,
}) {
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

  //const resetForm = () => {
  //  setName('');
  //  setAmount('');
  //  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditItem({ name, type, amount: Number(amount) });
    closeActiveModal();
    // resetForm();
  };

  useEffect(() => {
    if (isOpen && transaction) {
      setName(transaction.name ?? '');
      setAmount(
        transaction.amount !== undefined ? transaction.amount.toString() : ''
      );
      setType(transaction.type ?? '');
    }
  }, [transaction, isOpen]);

  return (
    <div
      className={`editTransactionModal ${
        isOpen ? 'editTransactionModal_opened' : ''
      }`}
    >
      <div className='editTransactionModal__content'>
        <button
          type='button'
          className='editTransactionModal__close'
          onClick={closeActiveModal}
        ></button>
        <form className='editTransactionModal__Form' onSubmit={handleSubmit}>
          <h2 className='editTransactionModal__title'>Add Income/Expense</h2>
          <fieldset className='editTransactionModal__radio-buttons'>
            <legend className='editTransactionModal__legend'>
              Select the transaction type:
            </legend>
            <label
              htmlFor='edit-income'
              className='editTransactionModal__label editTransactionModal__label_type_radio'
            >
              <input
                type='radio'
                name='amount-type'
                className='editTransactionModal__radio-input'
                id='edit-income'
                value='income'
                checked={type === 'income'}
                onChange={handleTypeChange}
              />
              Income
            </label>
            <label
              htmlFor='edit-expense'
              className='editTransactionModal__label editTransactionModal__label_type_radio'
            >
              <input
                type='radio'
                name='amount-type'
                className='editTransactionModal__radio-input'
                id='edit-expense'
                value='expense'
                checked={type === 'expense'}
                onChange={handleTypeChange}
              />
              Expense
            </label>
          </fieldset>
          <label htmlFor='edit-name' className='editTransactionModal__label'>
            Name
            <input
              type='text'
              className='editTransactionModal__input'
              id='edit-name'
              placeholder='Name'
              minLength='1'
              maxLength='30'
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label htmlFor='edit-amount' className='editTransactionModal__label'>
            Amount
            <input
              type='number'
              className='editTransactionModal__input'
              id='edit-amount'
              placeholder='Amount'
              minLength='1'
              value={amount}
              onChange={handleAmountChange}
            />
          </label>
          <button type='submit' className='editTransactionModal__submit'>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTransactionModal;
