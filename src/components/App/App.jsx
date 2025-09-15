import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import MoneyModal from '../MoneyModal/MoneyModal';
import SignUpModal from '../SignUpModal/SignupModal';
import { register, logIn, getUserInfo } from '../../utils/auth';
import { getToken, removeToken, setToken } from '../../utils/token';
import { postItems, deleteItems, getItems, patchItems } from '../../utils/api';
import SignInModal from '../SignInModal/SignInModal';
import CurrentUserContext from '../../context/CurrentUserContext';
import EditTransactionModal from '../EditTransactionModal/EditTransactionModal';
import DeleteModal from '../DeleteModal/DeleteModal';

function App() {
  const [activeModal, setActiveModal] = useState('');
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [transactionItems, setTransactionItems] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Registration/Login
  const handleRegistration = (data) => {
    register(data)
      .then(() => {
        handleLogIn({ email: data.email, password: data.password });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogIn = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    logIn({ email, password })
      .then((data) => {
        if (!data.token) console.error('JWT Token not found');
        setToken(data.token);
        return getUserInfo(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error('Error logging in: ', err);
      });
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    removeToken();
  };

  useEffect(() => {
    const jwt = getToken();

    if (jwt) {
      getUserInfo(jwt)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('Invalid token: ', err);
          removeToken();
        });
    } else {
    }
  }, []);

  // Adding Transactions
  const onAddItem = (data) => {
    const token = getToken();
    if (!token) {
      console.error('No token found, log in first');
      return;
    }
    console.log('Sending to API:', data);
    postItems(data, token)
      .then((newItem) => {
        setTransactionItems((prevItems) => [newItem.data, ...prevItems]);
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  const handleEditItem = (data) => {
    const token = getToken();
    if (!token || !selectedTransaction) {
      console.error('Missing token or transaction');
      return;
    }

    patchItems(data, selectedTransaction._id, token)
      .then((updatedTransaction) => {
        setTransactionItems((transactions) =>
          transactions.map((item) =>
            item._id === selectedTransaction._id
              ? updatedTransaction.data
              : item
          )
        );
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  const handleDeleteTransaction = (id) => {
    const token = getToken();
    if (!token) {
      console.error('No token found');
      return;
    }

    deleteItems(id, token)
      .then(() => {
        setTransactionItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setTransactionItems(data);
      })
      .catch(console.error);
  }, []);

  // Modals
  const handleAddClick = () => {
    setActiveModal('add-transaction');
  };

  const handleSignUpModal = () => {
    setActiveModal('signup');
  };

  const handleSignInModal = () => {
    setActiveModal('signin');
  };

  const handleEditModal = (transaction) => {
    setActiveModal('edit');
    setSelectedTransaction(transaction);
  };

  const handleDeleteModal = () => {
    setActiveModal('delete');
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <div className='app__content'>
          <Header
            isLoggedin={isLoggedin}
            handleSignInModal={handleSignInModal}
            handleLogOut={handleLogOut}
            currentUser={currentUser}
          />
          <Main
            isLoggedin={isLoggedin}
            handleAddClick={handleAddClick}
            transactionItems={transactionItems}
            handleEditModal={handleEditModal}
            handleSignInModal={handleSignInModal}
          />
        </div>
        <MoneyModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === 'add-transaction'}
          onAddItem={onAddItem}
        />
        <SignUpModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === 'signup'}
          handleRegistration={handleRegistration}
        />
        <SignInModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === 'signin'}
          handleLogIn={handleLogIn}
          handleSignUpModal={handleSignUpModal}
        />
        <EditTransactionModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === 'edit'}
          handleEditItem={handleEditItem}
          transaction={selectedTransaction}
          handleDeleteModal={handleDeleteModal}
        />
        <DeleteModal
          isOpen={activeModal === 'delete'}
          closeActiveModal={closeActiveModal}
          handleDeleteTransaction={handleDeleteTransaction}
          transaction={selectedTransaction}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
