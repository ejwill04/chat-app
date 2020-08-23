import React, { useState } from 'react';
import io from 'socket.io-client';

import './App.css';

const socket = io.connect('http://localhost:8000');

function App() {
  const [msg, setMsg] = useState('');

  const onTextChange = e => {
    setMsg(e.target.value);
  };

  const handleSubmit = () => {
    socket.emit('message', msg);
    setMsg('');
  };

  return (
    <div>
      <input 
        onChange={onTextChange} 
        value={msg} 
      />
      <button 
        onClick={handleSubmit}>
          >
      </button>
    </div>
  );
}

export default App;
