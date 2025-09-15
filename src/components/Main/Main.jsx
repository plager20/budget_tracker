import Budget from '../Budget/Budget';

function Main({
  isLoggedin,
  handleAddClick,
  transactionItems,
  handleEditModal,
  handleSignInModal,
}) {
  return (
    <Budget
      isLoggedin={isLoggedin}
      handleAddClick={handleAddClick}
      transactionItems={transactionItems}
      handleEditModal={handleEditModal}
      handleSignInModal={handleSignInModal}
    />
  );
}

export default Main;
