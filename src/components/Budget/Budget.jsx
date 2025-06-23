import './Budget.css';

function Budget() {
  return (
    <section className='budget'>
      <div className='budget__header'>
        <h2 className='budget__title'>Budget</h2>
      </div>
      <div className='budget__lists'>
        <ul className='budget__income'>Income</ul>
        <ul className='budget__expenses'>Expenses</ul>
      </div>
    </section>
  );
}

export default Budget;
