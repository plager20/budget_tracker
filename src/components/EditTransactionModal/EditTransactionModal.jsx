import { useState, useEffect } from 'react';
import './EditTransactionModal.css';

function EditTransactionModal({
  closeActiveModal,
  isOpen,
  handleEditItem,
  transaction,
  handleDeleteModal,
}) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueDateFrequency, setDueDateFrequency] = useState('');

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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleDueDateChange = (e) => setDueDate(e.target.value);

  const handleDueDateFrequencyChange = (e) =>
    setDueDateFrequency(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditItem({
      name,
      type,
      amount: Number(amount),
      category,
      dueDate,
      dueDateFrequency,
    });
  };

  const frequency = ['One Time', 'Weekly', 'Bi-Weekly', 'Monthly', 'Annually'];

  const availableCategories =
    type === 'income'
      ? incomeCategories
      : type === 'expense'
      ? expenseCategories
      : [];

  useEffect(() => {
    if (isOpen && transaction) {
      setName(transaction.name ?? '');
      setAmount(
        transaction.amount !== undefined ? transaction.amount.toString() : ''
      );
      setType(transaction.type ?? '');
      setCategory(transaction.category ?? '');

      // ✅ Fix date format (convert to yyyy-MM-dd)
      if (transaction.dueDate) {
        const formattedDate = new Date(transaction.dueDate)
          .toISOString()
          .split('T')[0];
        setDueDate(formattedDate);
      } else {
        setDueDate('');
      }
      setDueDateFrequency(transaction.dueDateFrequency ?? '');
    }
  }, [transaction, isOpen]);
  // useEffect(() => {
  //   if (isOpen && transaction) {
  //     setName(transaction.name ?? '');
  //     setAmount(
  //       transaction.amount !== undefined ? transaction.amount.toString() : ''
  //     );
  //     setType(transaction.type ?? '');
  //     setCategory(transaction.category ?? '');
  //     setDueDate(transaction.dueDate);
  //   }
  // }, [transaction, isOpen]);

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

            {/* Transaction Type */}
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

          {/* Transaction Name */}
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

          {/* Transaction Amount */}
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

          {/* Transaction Category */}
          {type && (
            <label
              htmlFor='edit-category'
              className='editTransactionModal__label'
            >
              Category
              <select
                id='category'
                className='editTransactionModal__input'
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

          {/* Transaction Due/Receive Date */}
          {type && (
            <label htmlFor='dueDate' className='editTransactionModal__label'>
              Next Due/Receive Date
              <input
                type='date'
                id='dueDate'
                className='editTransactionModal__input'
                value={dueDate}
                onChange={handleDueDateChange}
                required
              ></input>
              <select
                id='dueDateFrequency'
                className='editTransactionModal__input'
                value={dueDateFrequency}
                onChange={handleDueDateFrequencyChange}
                required
              >
                <option value='' disabled>
                  Select Frequency
                </option>
                {frequency.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className='editTransactionModal__btn-container'>
            <button type='submit' className='editTransactionModal__submit'>
              Edit
            </button>
            <button
              type='button'
              onClick={handleDeleteModal}
              className='editTransactionModal__delete-btn'
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTransactionModal;
