import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import MoneyModal from '../MoneyModal/MoneyModal';

function App() {
  const [activeModal, setActiveModal] = useState('');

  const handleAddClick = () => {
    setActiveModal('add-transaction');
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };

  return (
    <div className='App'>
      <div className='app__content'>
        <Header />
        <Main handleAddClick={handleAddClick} />
      </div>
      <MoneyModal
        closeActiveModal={closeActiveModal}
        isOpen={activeModal === 'add-transaction'}
      />
    </div>
  );
}

export default App;
