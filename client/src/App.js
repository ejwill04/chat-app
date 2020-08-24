import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import './App.css';

const socket = io.connect('http://localhost:8000');

const Chat = ({ chat }) => {
  return (
    <div>
      {chat.map(({ msg, username }, index) => (
        <div key={index}>
          {username && <span>{username}: </span>}
          <span>{msg}</span>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState('');
  const [hasName, setHasName] = useState(false);

  useEffect(() => {
    socket.on('new message', data => {
      setChat(chats => [...chats, data])
    });
    return () => {
      socket.off('new message');
    }
  }, []);

  useEffect(() => {
    socket.on('user joined', ({ username }) => {
      setChat(chats => [...chats, { msg: `${username} joined` }]);
    });
    return () => {
      socket.off('user joined');
    }
  }, []);

  const onTextChange = e => {
    setMsg(e.target.value);
  };

  const handleSubmit = () => {
    socket.emit('new message', { msg });
    setMsg('');
  };

  const onNameChange = e => {
    setUsername(e.target.value);
  };

  const handleSubmitName = () => {
    socket.emit('add user', username);
    setHasName(true);
  }

  if (!hasName) {
    return (
      <div>
        <input
          onChange={onNameChange}
          value={username}
        />
        <button
          onClick={handleSubmitName}>
          Add username
      </button>
      </div>
    )
  }

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
      <Chat chat={chat} />
    </div>
  );
}

export default App;
