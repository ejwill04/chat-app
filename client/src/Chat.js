import React, { useState, useEffect } from 'react';

import './style.css';

const ChatThread = ({ chat }) => {
  return (
    <div className='chatThread'>
      {chat.map(({ msg, username }, index) => (
        <div key={index} className='msg'>
          {username && <span>{username}: </span>}
          <span>{msg}</span>
        </div>
      ))}
    </div>
  )
}

function Chat({ socket }) {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('new message', data => {
      setChat(chats => [...chats, data])
    });
    return () => {
      socket.off('new message');
    }
  }, [socket]);

  useEffect(() => {
    socket.on('user joined', ({ username }) => {
      setChat(chats => [...chats, { msg: `${username} joined` }]);
    });
    return () => {
      socket.off('user joined');
    }
  }, [socket]);

  const onTextChange = e => {
    setMsg(e.target.value);
  };

  const handleSubmit = () => {
    socket.emit('new message', { msg });
    setMsg('');
  };

  return (
    <div className='chat'>
      <h2>
        Chat App - Let's Start Chatting
      </h2>
      <ChatThread chat={chat} />
      <span className='chatForm'>
        <input
          className='chatForm-input'
          onChange={onTextChange}
          value={msg}
          placeholder='Type your message here'
        />
        <button
          onClick={handleSubmit}>
          >
        </button>
      </span>
    </div>
  );
}

export default Chat;
