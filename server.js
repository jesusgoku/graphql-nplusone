import { ApolloServer, gql } from 'apollo-server';
import Knex from 'knex';

const knex = new Knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

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
    books: async () => knex('books').select(),
    authors: async () => knex('authors').select(),
  },

  Book: {
    author: async (book) => {
      const data = await knex('authors')
        .select()
        .where('id', book.author_id);

      return data[0];
    },
  },

  Author: {
    books: async (author) => {
      const data = await knex('books')
        .select()
        .where('author_id', author.id);

      return data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await server.listen();

  console.log(`Server listen on: ${url}`); // eslint-disable-line no-console
})();
