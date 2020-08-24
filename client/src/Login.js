import React, { useState } from 'react';

function Login({ socket, history }) {
  const [username, setUsername] = useState('');

  const onNameChange = e => {
    setUsername(e.target.value);
  };

  const handleSubmitName = () => {
    socket.emit('add user', username, () => history.push('/chat'));

  }

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

export default Login;
