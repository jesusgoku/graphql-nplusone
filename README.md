# GraphQL N+1 Problem

Implement DataLoader library for solve GraphQL N+1 problem.

## Running

```bash
# Create .env file and complete
cp .env.dist .env

# Up app and db
docker-compose up --build -d

# Initial setup run migration and seed
docker-compose exec app yarn run knex migrate:up
docker-compose exec app yarn run knex seed:run

# Open your browser on http://localhost:4000
```
