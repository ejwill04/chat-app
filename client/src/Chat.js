import React, { useState, useEffect } from 'react';

const ChatTread = ({ chat }) => {
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
    <div>
      <input
        onChange={onTextChange}
        value={msg}
      />
      <button
        onClick={handleSubmit}>
        >
      </button>
      <ChatTread chat={chat} />
    </div>
  );
}

export default Chat;
