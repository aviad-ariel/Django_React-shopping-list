import React from 'react';
import './App.css';
import Navibar from './components/navbar/Navibar';
import List from './components/List/List';
import { Provider } from "react-redux";
import store from "./store";

function App() {

  return (
    <Provider store={store}>
      <Navibar/>
      <List/>
    </Provider>
  );
}

export default App;
