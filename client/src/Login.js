import React, { useState } from 'react';

import './style.css'

function Login({ socket, history }) {
  const [username, setUsername] = useState('');

  const onNameChange = e => {
    setUsername(e.target.value);
  };

  const handleSubmitName = () => {
    // a better approach would check for username uniqueness and ensure the username is clean
    socket.emit('add user', username, () => history.push('/chat'));
  }

  return (
    <div className='login'>
      <h2>
        Chat App - Enter a Username
      </h2>
      <input
        className='usernameInput'
        onChange={onNameChange}
        value={username}
      />
      <button
        className='usernameButton'
        onClick={handleSubmitName}>
        Submit
    </button>
    </div>
  )
}

export default Login;
