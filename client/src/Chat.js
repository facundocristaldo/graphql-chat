import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import React from 'react';
import { addMessageMutation, messagesQuery, messageAddedSubscription } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const { loading, error, data } = useQuery(messagesQuery)

  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log("onSubscriptionData", client, subscriptionData)
      client.writeQuery({
        query: messagesQuery,
        data: {
          messages: messages.concat(subscriptionData.data.messageAdded)
        }
      })
    }
  })
  const [addMessage] = useMutation(addMessageMutation)

  const messages = data ? data.messages : [];

  const handleSend = async (text) => {
    await addMessage({ variables: { input: { text: text } } })
  }

  loading && <h1>Loading....</h1>
  error && <p>{JSON.stringify(error)}</p>
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}

export default Chat;
