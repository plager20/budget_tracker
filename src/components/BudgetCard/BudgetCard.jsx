import './BudgetCard.css';

function BudgetCard({ transaction, handleEditModal }) {
  return (
    <li className='budgetCard__list-item'>
      <p>{transaction.name}</p>
      {transaction.type === 'income' ? (
        <p className='budgetCard__income'>+${transaction.amount}</p>
      ) : (
        <p className='budgetCard__expense'>-${transaction.amount}</p>
      )}

      <button
        className='budgetCard__edit-btn'
        onClick={() => handleEditModal(transaction)}
      ></button>
    </li>
  );
}

export default BudgetCard;
