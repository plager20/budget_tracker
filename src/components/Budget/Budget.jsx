import './Budget.css';
import BudgetCard from '../BudgetCard/BudgetCard';
import { useContext, useState } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';

function Budget({
  isLoggedin,
  handleAddClick,
  transactionItems,
  handleEditModal,
  handleSignInModal,
}) {
  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState('All');
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState('All');

  const currentUser = useContext(CurrentUserContext);

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

  const userTransactions = transactionItems.filter(
    (transaction) => transaction.owner === currentUser?._id
  );

  const incomeTransactions = userTransactions.filter(
    (transaction) => transaction.type === 'income'
  );
  const expenseTransactions = userTransactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  const filteredIncomeTransactions = incomeTransactions.filter((item) => {
    if (selectedIncomeCategory === 'All') return true;
    return item.category === selectedIncomeCategory;
  });

  const filteredExpenseTransactions = expenseTransactions.filter((item) => {
    if (selectedExpenseCategory === 'All') return true;
    return item.category === selectedExpenseCategory;
  });

  const incomeTotal = filteredIncomeTransactions.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const expenseTotal = filteredExpenseTransactions.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const netTotal = incomeTotal - expenseTotal;

  const formatCurrency = (amount) => {
    const isNegative = amount < 0;
    const absolute = Math.abs(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return isNegative ? `-${absolute}` : absolute;
  };
  return (
    <section className='budget'>
      <div className='budget__header'>
        <h2 className='budget__title'>Budget</h2>
        <p className='budget__net-income'>Net: {formatCurrency(netTotal)}</p>
        <button
          className='budget__add-item'
          onClick={isLoggedin ? handleAddClick : handleSignInModal}
        >
          Add income/expense
        </button>
      </div>
      <div className='budget__lists'>
        <ul className='budget__list'>
          <span className='budget__list-title'>Income</span>
          <div className='budget__list-filter-options'>
            <div className='budget__list-filter-category'>
              Filter by Category:
              <select
                value={selectedIncomeCategory}
                onChange={(e) => setSelectedIncomeCategory(e.target.value)}
              >
                <option value='All'>All</option>
                {incomeCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className='budget__list-filter-due-date'>
              Filter by Date Due:
            </div>
          </div>
          {filteredIncomeTransactions.length > 0 ? (
            filteredIncomeTransactions.map((filteredIncomeTransaction) => {
              return (
                <BudgetCard
                  key={filteredIncomeTransaction._id}
                  transaction={filteredIncomeTransaction}
                  handleEditModal={handleEditModal}
                />
              );
            })
          ) : (
            <p>No Income Found</p>
          )}
        </ul>
        <ul className='budget__list'>
          <span className='budget__list-title'>Expenses</span>
          <div className='budget__list-filter-options'>
            <div className='budget__list-filter-category'>
              Filter by Category:
              <select
                value={selectedExpenseCategory}
                onChange={(e) => setSelectedExpenseCategory(e.target.value)}
              >
                <option value='All'>All</option>
                {expenseCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className='budget__list-filter-due-date'>
              Filter by Date Due:
            </div>
          </div>
          {filteredExpenseTransactions.length > 0 ? (
            filteredExpenseTransactions.map((filteredExpenseTransaction) => {
              return (
                <BudgetCard
                  key={filteredExpenseTransaction._id}
                  transaction={filteredExpenseTransaction}
                  handleEditModal={handleEditModal}
                />
              );
            })
          ) : (
            <p>No Expenses Found</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Budget;
