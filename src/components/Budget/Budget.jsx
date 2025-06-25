import './Budget.css';
import BudgetCard from '../BudgetCard/BudgetCard';
import { useContext } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';

function Budget({ handleAddClick, transactionItems, handleEditModal }) {
  const currentUser = useContext(CurrentUserContext);

  const userTransactions = transactionItems.filter(
    (transaction) => transaction.owner === currentUser?._id
  );

  const incomeTransactions = userTransactions.filter(
    (transaction) => transaction.type === 'income'
  );
  const expenseTransactions = userTransactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  const incomeTotal = incomeTransactions.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const expenseTotal = expenseTransactions.reduce(
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
        <button className='budget__add-item' onClick={handleAddClick}>
          Add income/expense
        </button>
      </div>
      <div className='budget__lists'>
        <ul className='budget__list'>
          <span className='budget__list-title'>Income</span>
          {incomeTransactions.length > 0 ? (
            incomeTransactions.map((incomeTransaction) => {
              return (
                <BudgetCard
                  key={incomeTransaction._id}
                  transaction={incomeTransaction}
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
          {expenseTransactions.length > 0 ? (
            expenseTransactions.map((expenseTransaction) => {
              return (
                <BudgetCard
                  key={expenseTransaction._id}
                  transaction={expenseTransaction}
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
