# Notes API

## Prerequisites

- Docker
- Node.js v14

## Setup

1. Run Postgres, e.g. `docker run -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test -e POSTGRES_DB=test --name test -p 5433:5432 -d postgres`
1. `npm i`
1. `cp .env.example .env`
1. `npm run db:init`

## Starting the app

1. `npm start`

## Tests

1. `npm t` - unit tests
1. `npm run test:functional` - functional tests
