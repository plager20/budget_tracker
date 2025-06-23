import './Budget.css';

function Budget({ handleAddClick }) {
  return (
    <section className='budget'>
      <div className='budget__header'>
        <h2 className='budget__title'>Budget</h2>
        <p className='budget__net-income'>Net: $0</p>
        <button className='budget__add-item' onClick={handleAddClick}>
          Add income/expense
        </button>
      </div>
      <div className='budget__lists'>
        <ul className='budget__list'>
          <span className='budget__list-title'>Income</span>
          <li className='budget__list-item'>
            <p>Work</p>
            <p className='budget__income'>+$500</p>
            <button className='budget__edit-btn'></button>
          </li>
        </ul>
        <ul className='budget__list'>
          <span className='budget__list-title'>Expenses</span>
          <li className='budget__list-item'>
            <p>Utility</p>
            <p className='budget__expense'>-$130</p>
            <button className='budget__edit-btn'></button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Budget;
