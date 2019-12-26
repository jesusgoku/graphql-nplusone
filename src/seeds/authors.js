/* eslint-disable @typescript-eslint/camelcase */

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('authors')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('authors').insert([
        {
          id: 1,
          name: 'Sir Arthur Conan Doyle',
        },
        {
          id: 2,
          name: 'Agatha Christie',
        },
      ]);
    })
    .then(() => {
      return knex('books').insert([
        { id: 1, title: 'Estudio en Escarlata', author_id: 1 },
        { id: 2, title: 'El Sabueso de los Baskerville', author_id: 1 },
        { id: 3, title: 'Escándalo en el Bohemia', author_id: 1 },
        { id: 4, title: 'Las Aventuras de Sherlock Holmes', author_id: 1 },
        { id: 5, title: 'Las Cuatro Pepitas de Naranja', author_id: 1 },
      ]);
    });
};
