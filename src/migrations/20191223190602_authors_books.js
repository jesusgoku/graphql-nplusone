exports.up = (knex) => {
  return knex.schema
    .createTable('authors', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
    })
    .createTable('books', (table) => {
      table.increments('id')
      table.string('title', 255).notNullable();
      table.integer('author_id').unsigned().notNullable();
      table.foreign('author_id').references('id').inTable('authors');
    });
};

exports.down = (knex) => {
  knex.schema
    .dropTable('books')
    .dropTable('authors');
};
