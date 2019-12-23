import { ApolloServer, gql } from 'apollo-server';

const books = [
  { id: 1, title: 'Cinco Pepitas de Naranja', authorId: 1 },
  { id: 2, title: 'El Sabueso de los Baskerville', authorId: 1 },
  { id: 3, title: 'El Signo de los Cuatro', authorId: 1 },
  { id: 4, title: 'Escándalo en el Bohemia', authorId: 1 },
  { id: 5, title: 'Estudio en Escarlata', authorId: 1 },
];

const authors = [{ id: 1, name: 'Sir Arthur Conan Doyle' }];

const typeDefs = gql`
  type Book {
    id: Int
    title: String
    author: Author
  }

  type Author {
    id: Int
    name: String
    books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },

  Book: {
    author: (book) => {
      return authors.find(({ id }) => id === book.authorId);
    },
  },

  Author: {
    books: (author) => {
      return books.filter((book) => book.authorId === author.id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
  const { url } = await server.listen();

  console.log(`Server listen on: ${url}`); // eslint-disable-line no-console
})();
