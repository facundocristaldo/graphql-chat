import { addMessageMutation, messagesQuery, messageAddedSubscription } from './graphql/queries';
import { useMutation, useQuery, useSubscription } from '@apollo/client';


export const useChatMessages = () => {
  const { loading, error, data } = useQuery(messagesQuery)

  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
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

  return {
    messages,
    addMessage: (text) => addMessage({ variables: { input: { text: text } } }),
    loading,
    error
  }
}