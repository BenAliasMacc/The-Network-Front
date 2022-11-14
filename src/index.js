import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss'
import { fetchUsers } from './redux/reducers/usersSlice';

store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>  
        <App />
    </BrowserRouter>
  </Provider>
);
