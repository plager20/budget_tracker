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

  // Generate recurring transactions only for the selected filter
  const generateOccurrences = (transaction, filter) => {
    const results = [];
    const today = new Date();
    const dueDate = new Date(transaction.dueDate);

    // Frequency mapping (in days)
    const freqMap = {
      Once: null,
      Weekly: 7,
      Biweekly: 14,
      Monthly: 30,
      Annually: 365,
    };

    const freqDays = freqMap[transaction.dueDateFrequency];
    const maxMonths = 3; // safety limit
    const endLimit = new Date(today);
    endLimit.setMonth(endLimit.getMonth() + maxMonths);

    // "All" filter only shows transactions once
    if (filter === 'All' || !freqDays) {
      results.push(transaction);
      return results;
    }

    let currentDate = new Date(dueDate);

    while (currentDate <= endLimit) {
      const startOfThisWeek = new Date(today);
      startOfThisWeek.setDate(today.getDate() - today.getDay());
      const endOfThisWeek = new Date(startOfThisWeek);
      endOfThisWeek.setDate(endOfThisWeek.getDate() + 6);

      const startOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const endOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );

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

      let shouldAdd = false;

      if (filter === 'This Week') {
        shouldAdd =
          currentDate >= startOfThisWeek && currentDate <= endOfThisWeek;
      } else if (filter === 'This Month') {
        shouldAdd =
          currentDate >= startOfThisMonth && currentDate <= endOfThisMonth;
      } else if (filter === 'Next Month') {
        shouldAdd =
          currentDate >= startOfNextMonth && currentDate <= endOfNextMonth;
      }

      if (shouldAdd) {
        results.push({
          ...transaction,
          generatedDate: currentDate.toISOString().split('T')[0],
        });
      }

      if (!freqDays) break;
      currentDate.setDate(currentDate.getDate() + freqDays);
    }

    return results;
  };

  // Filter transactions by user
  const userTransactions = transactionItems.filter(
    (transaction) => transaction.owner === currentUser?._id
  );

  const incomeTransactions = userTransactions.filter(
    (transaction) => transaction.type === 'income'
  );
  const expenseTransactions = userTransactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  // Apply filters & generate occurrences
  const filteredIncomeTransactions = incomeTransactions.flatMap((item) => {
    const categoryMatch =
      selectedIncomeCategory === 'All' ||
      item.category === selectedIncomeCategory;

    if (!categoryMatch) return [];

    return generateOccurrences(item, selectedIncomeFrequency);
  });

  const filteredExpenseTransactions = expenseTransactions.flatMap((item) => {
    const categoryMatch =
      selectedExpenseCategory === 'All' ||
      item.category === selectedExpenseCategory;

    if (!categoryMatch) return [];

    return generateOccurrences(item, selectedExpenseFrequency);
  });

  // Totals
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
        {/* Income */}
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
            filteredIncomeTransactions.map((tx, index) => (
              <BudgetCard
                key={tx._id + (tx.generatedDate || index)}
                transaction={tx}
                handleEditModal={handleEditModal}
              />
            ))
          ) : (
            <p>No Income Found</p>
          )}
        </ul>

        {/* Expenses */}
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
            filteredExpenseTransactions.map((tx, index) => (
              <BudgetCard
                key={tx._id + (tx.generatedDate || index)}
                transaction={tx}
                handleEditModal={handleEditModal}
              />
            ))
          ) : (
            <p>No Expenses Found</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Budget;
