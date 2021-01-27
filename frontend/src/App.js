

import React, { lazy, Suspense, Component } from 'react';
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navbar/navbar";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
