import React, { useState, useEffect } from 'react';

import ChatThread from './ChatThread';
import { sanitizeString } from './utils';
import './style.css';

function Chat({ socket, history }) {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState('');

  // this user joined effect
  useEffect(() => {
    socket.emit('this user joined', null, (username) => {
      if (!username) {
        return history.push('/');
      }
    });
    return () => {
      socket.off('this user joined');
    };
  }, [socket, history]);

  // new message effect
  useEffect(() => {
    socket.on('new message', (data) => {
      // TODO - Appending data to end works for small usecase.  Consider some type of lazy loading.
      setChat((chats) => [...chats, data]);
    });
    return () => {
      socket.off('new message');
    };
  }, [socket]);

  // user joined effect
  useEffect(() => {
    socket.on('user joined', (data) => {
      // TODO - Appending data to end works for small usecase.  Consider some type of lazy loading.
      // It might also be nice to handle these types of messages with a different style.  Note no username.
      setChat((chats) => [...chats, data]);
    });
    return () => {
      socket.emit('disconnect');
      socket.off('user joined');
    };
  }, [socket]);

  // user disconnected effect
  useEffect(() => {
    socket.on('user disconnect', (data) => {
      setChat((chats) => [...chats, data]);
    });
    return () => {
      socket.off('user disconnect');
    };
  }, [socket]);

  // a user is typing effect
  useEffect(() => {
    socket.on('typing', (data) => {
      setTyping(data);
    });
    return () => {
      socket.off('typing');
    };
  }, [socket]);

  const onTextChange = (e) => {
    const str = e.target.value;
    socket.emit('typing', Boolean(str.length));
    setMsg(str);
  };

  const handleSubmit = () => {
    // TODO - Consider limiting length/type of content
    socket.emit('new message', { msg: sanitizeString(msg) });
    socket.emit('typing', false);
    setMsg('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div id="chat">
      <h2>Chat App - Let's Start Chatting</h2>
      <div id="chatWrapper">
        <ChatThread chat={chat} />
        <span id="chatForm">
          <input
            onChange={onTextChange}
            value={msg}
            placeholder="Type your message here"
            onKeyDown={handleKeyDown}
          />
          <button id="chatForm-submitBtn" onClick={handleSubmit}>
            Send
          </button>
        </span>
      </div>
      {typing}
    </div>
  );
}

export default Chat;
