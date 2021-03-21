import React from 'react';
import { useChatMessages } from './hooks';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const { messages, addMessage, loading, error } = useChatMessages();

  loading && <h1>Loading....</h1>
  error && <p>{JSON.stringify(error)}</p>
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={addMessage} />
      </div>
    </section>
  );
}

export default Chat;
