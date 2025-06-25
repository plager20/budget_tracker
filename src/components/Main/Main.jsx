import Budget from '../Budget/Budget';

function Main({ handleAddClick, transactionItems, handleEditModal }) {
  return (
    <Budget
      handleAddClick={handleAddClick}
      transactionItems={transactionItems}
      handleEditModal={handleEditModal}
    />
  );
}

export default Main;
