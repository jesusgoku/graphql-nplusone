import { ApolloServer, gql } from 'apollo-server';

const books = [
  { title: 'Cinco Pepitas de Naranja', author: 'Sir Arthur Conan Doyle' },
  { title: 'El Sabueso de los Baskerville', author: 'Sir Arthur Conan Doyle' },
  { title: 'El Signo de los Cuatro', author: 'Sir Arthur Conan Doyle' },
  { title: 'Escándalo en el Bohemia', author: 'Sir Arthur Conan Doyle' },
  { title: 'Estudio en Escarlata', author: 'Sir Arthur Conan Doyle' },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
  const { url } = await server.listen();

  console.log(`Server listen on: ${url}`); // eslint-disable-line no-console
})();
