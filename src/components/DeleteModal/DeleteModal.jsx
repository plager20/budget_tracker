import './DeleteModal.css';

function DeleteModal({
  closeActiveModal,
  isOpen,
  handleDeleteTransaction,
  transaction,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDeleteTransaction(transaction._id);
  };

  return (
    <div className={`deleteModal ${isOpen ? 'deleteModal_opened' : ''}`}>
      <div className='deleteModal__content'>
        <button
          type='button'
          className='deleteModal__close'
          onClick={closeActiveModal}
        ></button>
        <h2 className='deleteModal__title'>
          Are you sure you want to delete this item?
        </h2>
        <div className='deleteModal__btn-container'>
          <button className='deleteModal__yes' onClick={handleSubmit}>
            Yes
          </button>
          <button className='deleteModal__no' onClick={closeActiveModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
