'use client';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Head from "next/head";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
});

export default function Providers({ children }) {
  return <ApolloProvider client={client}>
    <Head>
      <meta name="viewport" content="viewport-fit=cover" />
    </Head>
    {children}
  </ApolloProvider>;
}
