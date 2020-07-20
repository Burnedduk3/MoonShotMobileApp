import { ApolloClient, InMemoryCache } from '@apollo/client';

let client = null;

export const getClient = () => {
  if (!client) {
    client = new ApolloClient({
      uri: 'https://moonshot-colombia.herokuapp.com/graphql',
      cache: new InMemoryCache(),
    });
  }
  return client;
};
