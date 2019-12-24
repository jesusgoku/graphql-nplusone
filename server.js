import { ApolloServer, gql } from 'apollo-server';
import Knex from 'knex';
import DataLoader from 'dataloader';

const knex = new Knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

const authorsLoader = new DataLoader(async (keys) => {
  const authors = await knex('authors')
    .select()
    .whereIn('id', keys);

  return keys.reduce((acc, key) => {
    const author = authors.find((item) => item.id === key);

    acc.push(author);

    return acc;
  }, []);
});

const authorBooksLoader = new DataLoader(async (keys) => {
  const books = await knex('books')
    .select()
    .whereIn('author_id', keys);

  const booksByAuthor = books.reduce((acc, item) => {
    if (item.author_id in acc) {
      acc[item.author_id].push(item);
    } else {
      acc[item.author_id] = [item];
    }

    return acc;
  }, {});

  return keys.reduce((acc, key) => {
    acc.push(booksByAuthor[key]);

    return acc;
  }, []);
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
      return authorsLoader.load(book.author_id);
    },
  },

  Author: {
    books: async (author) => {
      return authorBooksLoader.load(author.id);
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
