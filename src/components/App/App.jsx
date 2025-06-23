import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  return (
    <div className='App'>
      <div className='app__content'>
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
