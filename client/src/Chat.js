import React, { useState, useEffect } from 'react';

import './style.css';

const ChatThread = ({ chat }) => {
  // TODO - Get username to provide left/right styling based on message author
  return (
    <div id='chatThread'>
      {chat.map(({ msg, username }, index) => (
        <div key={index} className='msg'>
          {username && <span>{username}: </span>}
          <span>{msg}</span>
        </div>
      ))}
    </div>
  )
}

function Chat({ socket, history }) {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit('this user joined', null, username => {
      if (!username) {
        return history.push('/');
      }
    });
    return () => {
      socket.off('this user joined');
    }
  }, [socket, history])

  useEffect(() => {
    socket.on('new message', data => {
      // TODO - Appending data to end works for small usecase.  Consider some type of lazy loading.
      setChat(chats => [...chats, data])
    });
    return () => {
      socket.off('new message');
    }
  }, [socket]);

  useEffect(() => {
    socket.on('user joined', data => {
     // TODO - Appending data to end works for small usecase.  Consider some type of lazy loading.
     // It might also be nice to handle these types of messages with a different style.  Note no username.
      setChat(chats => [...chats, data]);
    });
    return () => {
      socket.emit('disconnect');
      socket.off('user joined');
    }
  }, [socket]);

  useEffect(() => {
    socket.on('user disconnect', data => {
      setChat(chats => [...chats, data])
    });
    return () => {
      socket.off('user disconnect');
    }
  }, [socket]);

  const onTextChange = e => {
    setMsg(e.target.value);
  };

  const handleSubmit = () => {
    // TODO - Clean response and consider limiting length/type of content
    socket.emit('new message', { msg });
    setMsg('');
  };

  return (
    <div id='chat'>
      <h2>
        Chat App - Let's Start Chatting
      </h2>
      <ChatThread chat={chat} />
      <span id='chatForm'>
        <input
          id='chatForm-input'
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
