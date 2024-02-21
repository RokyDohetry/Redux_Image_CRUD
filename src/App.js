// App.js
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Form from "./Form";
import List from "./List";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <h1 className="app-title">Form CRUD Example</h1>
      <Form />
      <List />
    </Provider>
  );
};

export default App;
