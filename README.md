## 📕 Summary

- [🛠️ Technologies ](#technologies)
- [📚 Libraries ](#libraries)
- [📝 Features](#features)
- [💻 How to run](#how-to-run)

## Technologies
- Node.js
- JavaScript

## Libraries
- bcrypt
- express
- cors
- pg
- uuid

## Features
- POST /sign-up
- POST /sign-in
- GET /transactions
- POST /transaction

## How to run

Clone this repo with 'git clone https://github.com/mateusrfon/my-wallet-api.git' on a terminal <br/>
Go to the directory with 'cd my-wallet-api' and then you can run:

### `npm i`
Installs all dependencies

### `npm run dev`
Runs the server in the development mode.

*(You should use the app from https://github.com/mateusrfon/my-wallet for a better view of the project)

### Database
Log into postgreSQL and run:

#### CREATE DATABASE mywallet;
Create the database

#### psql mywallet;
Connect to the database

#### copy and paste the SQL code from postgreSQL.txt

Done
