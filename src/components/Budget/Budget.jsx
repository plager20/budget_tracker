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
  const [selectedIncomeFrequency, setSelectedIncomeFrequency] = useState('All');
  const [selectedExpenseFrequency, setSelectedExpenseFrequency] =
    useState('All');

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

  const frequency = ['This Week', 'This Month', 'Next Month'];

  const getTransactionDueInfo = (transaction) => {
    const today = new Date();
    const dueDate = new Date(transaction.dueDate);

    // Calculate days until due
    const diffTime = dueDate - today;
    const daysUntilDue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Start/end of this week (Sunday → Saturday)
    const startOfThisWeek = new Date(today);
    startOfThisWeek.setDate(today.getDate() - today.getDay());

    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(endOfThisWeek.getDate() + 6);

    // Start/end of this month
    const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfThisMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    // Start/end of next month
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    );

    const dueCategories = [];

    // Determine applicable categories
    if (dueDate >= startOfThisWeek && dueDate <= endOfThisWeek) {
      dueCategories.push('This Week');
    }
    if (dueDate >= today && dueDate <= endOfThisMonth) {
      dueCategories.push('This Month');
    }
    if (dueDate >= startOfNextMonth && dueDate <= endOfNextMonth) {
      dueCategories.push('Next Month');
    }
    if (dueCategories.length === 0) {
      dueCategories.push('All');
    }

    return { daysUntilDue, dueCategories };
  };

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
    const categoryMatch =
      selectedIncomeCategory === 'All' ||
      item.category === selectedIncomeCategory;

    const { dueCategories } = getTransactionDueInfo(item);

    const frequencyMatch =
      selectedIncomeFrequency === 'All' ||
      dueCategories.includes(selectedIncomeFrequency);

    return categoryMatch && frequencyMatch;
  });

  const filteredExpenseTransactions = expenseTransactions.filter((item) => {
    const categoryMatch =
      selectedExpenseCategory === 'All' ||
      item.category === selectedExpenseCategory;

    const { dueCategories } = getTransactionDueInfo(item);

    const frequencyMatch =
      selectedExpenseFrequency === 'All' ||
      dueCategories.includes(selectedExpenseFrequency);

    return categoryMatch && frequencyMatch;
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
              Filter by Receive Due:
              <select
                value={selectedIncomeFrequency}
                onChange={(e) => setSelectedIncomeFrequency(e.target.value)}
              >
                <option value='All'>All</option>
                {frequency.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
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
              <select
                value={selectedExpenseFrequency}
                onChange={(e) => setSelectedExpenseFrequency(e.target.value)}
              >
                <option value='All'>All</option>
                {frequency.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
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
