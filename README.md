This repo provides a simple chat app that leverages a Node server, Socket.io, and a React frontend.  

## Instructions

1. From the root, please navigate to `/server`
2. `yarn install-deps` will install all dependencies in both the client and server
3. `yarn start-app` will start both the Node and Client servers

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Note: Please ensure you have a recent version of `Node` installed.  Any of the recent versions should suffice.  

## Approach

I knew there's alot that could be done here, so I needed to find a quick way to spin everything up.    I chose to use `create-react-app` for the frontend since it's well-known and easy to spin up, even if I would not use all of it's functionality.  For bi-directional communication, I chose `Socket.io` for it's simplicity and speed over a solution such as using `Websockets` directly.  I went with a very simple `Node.js` server for simplicity.

From here, it was quickly hacking together an application that would solve the high-level requirements:

1. It's possible to type a short message and have it sent to another user 
2. It's possible to see messages sent from another user appear reasonably soon after they were sent

I did add a few minor enhancements just for fun.

1. A login page for adding a username
2. Very basic and quick styling to give it sparkle
3. Messages that specify when another user is typing
4. Prompts for when a user joins and leaves the chat
5. Basic XSS escapes on the client
6. Super basic, don't really even want to mention it, "it renders" test
7. A redirect if a user tries to go to `/chat` before entering a username
8. Prettier for, well, making it pretty

## Areas of Improvement

This is not meant to be an exhaustive list but a starting point for conversation.

[Note that I included some TODOs in the code that cover some of these points]

### Testing

Both the client and server code need to be tested.  This might be a great candidate for e2e tests around typing and adding messages.  

### User input validation

Improve usability by providing some basic validations.  The server needs a sanitizer around incoming messages and usersname.

### Styling 

Just general lack of it.  I quickly hacked some styling together but that was not my focus per the instructions

### No persistence layer

Persistence was not specified in the AC, but it would a great add-on

### Performance

As the directions stated only two users and short messages, performance didn't seem particulary high in priority.  However, considering conversaton history, number of users, length of messages, or whether `socket.io` can establish a `Websocket` connection.

### Common Nice-to-haves

Users expectations for chat apps now includes: read receipts, typing notifications, scrolling to most recent messages, rich text support, and countless other improvements that this simple chat app did not set out to include, at least not initially. 
