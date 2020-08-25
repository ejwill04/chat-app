import React, { useEffect, useRef } from 'react';

import './style.css';

const ChatThread = ({ chat }) => {
  const chatBottomRef = useRef();

  useEffect(() => {
    chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);
  // TODO - Get username to provide left/right styling based on message author
  return (
    <div id="chatThread">
      {chat.map(({ msg, username }, index) => (
        <div key={index} className="msg">
          {username && <span>{username}: </span>}
          <span>{msg}</span>
        </div>
      ))}
      <div ref={chatBottomRef} />
    </div>
  );
};

export default ChatThread;
