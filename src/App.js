import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import Book from "./components/Book";

//Apollo Client Setup
const client = new ApolloClient({
  uri: 'https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
     <h1>Ello You!</h1>
     <Book/>
    </div>
    </ApolloProvider>
  );
}

export default App;
