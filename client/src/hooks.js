import { addMessageMutation, messagesQuery, messageAddedSubscription } from './graphql/queries';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';


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

  return { messages, addMessage, loading, error }
}