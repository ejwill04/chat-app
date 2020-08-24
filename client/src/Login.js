import React, { useState } from 'react';

import './style.css'

function Login({ socket, history }) {
  const [username, setUsername] = useState('');

  const onNameChange = e => {
    setUsername(e.target.value);
  };

  const handleSubmitName = () => {
    // TODO - Clean response and check for uniqueness
    socket.emit('add user', username, () => history.push('/chat'));
  }

  return (
    <div id='login'>
      <h2>
        Chat App - Enter a Username
      </h2>
      <input
        id='usernameInput'
        onChange={onNameChange}
        value={username}
      />
      <button
        id='usernameButton'
        onClick={handleSubmitName}>
        Submit
    </button>
    </div>
  )
}

export default Login;
