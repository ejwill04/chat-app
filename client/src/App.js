import React from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './Login';
import Chat from './Chat';

import './App.css';

const socket = io.connect('http://localhost:8000');

function App() {

  return (
    <Router>
      <Route path="/" exact render={props => <Login {...props} socket={socket} />} />
      <Route path="/chat" render={props => <Chat {...props} socket={socket} />} />
    </Router>
  )
}

export default App;
