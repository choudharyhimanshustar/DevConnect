'use client';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import Head from "next/head";
const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER, // Backend URL
    credentials: "include",              // Include cookies
  }),
  cache: new InMemoryCache(),
});

export default function Providers({ children }) {
  return <ApolloProvider client={client}>
    <Head>
      <meta name="viewport" content="viewport-fit=cover" />
    </Head>
    {children}
  </ApolloProvider>;
}
