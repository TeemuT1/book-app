# Book-app
A small book listing app. Stack is MERN (MongoDB, Express, React, Node)
The Node backend is in the root, and React frontend in the src folder.

## Features
* View the title and author of each book in a list
* Clicking a book selects it and displays its information in a form
* Add new books to the collection with a "Save new" button
* Update existing books with a "Save" button
* Delete selected book with a "Delete" button
* Book data is stored in a MongoDB database

## Main Technologies
Tech | Purpose
----- |--------
React |Front-end
Node |Server
Express| Router
MongoDB|Database
Cypress|E2E-testing
react-bootstrap| Styling

## Environment variables
Variable|Description|Example
--------|-----------|--------
PORT| port where backend api is running|5000
MONGODB_URI| URI for connecting to MongoDB| "mongodb+srv://[username]:[password]@[host]/[database]?[options]"
TEST_MONGODB_URI| URI for database for running tests| "mongodb+srv://[username]:[password]@[host]/[database]?[options]"

## How to set up
First you need to have a MongoDB database available for saving book data. After that:
1. Clone the repository
2. run `'npm install'` in the root directory
3. Set environment variables (in an .env file in the root)
4. run `'npm start:prod'` in the root to build the frontend and start the app in production mode
5. Open browser at localhost:5000 (or whatever port is set in the PORT environment variable)

Frontend will then be served as a static file for requests not meant for the API.

While developing run:
1. `'npm server:dev'` to start the server
2. `'npm start'`to start the frontend

In that case API requests will be proxied from frontend to the backend port. The backend port has to be set to the package.json file's "proxy" property (default 5000)

## Deploying to Heroku
The app can easily be deployed to Heroku from the root. Remember to set up environment variables at Heroku. Of course you also need a running MongoDB. Procfile for Heroku is included.

## Deployed demo
The app is deployed on Heroku at: https://immense-lowlands-29147.herokuapp.com/

## Tests
Some basic end to end testing is done with Cypress.
To run Cypress tests, launch the server in test mode and frontend
1. `'npm run server:test'`
2. `'npm run start'`
3. Run tests with graphic test runner: `'npm run cypress:open'`
or with command line: `'npm run test:e2e'`

You might have to edit ports in cypress.json

## Improvements that could be done
1. More tests
2. Add search, filtering, sorting of books
3. Use e.g. Websockets for updating the state if data in the database changes (due to other users).
4. Login / User account management ?
5. Should use different databases for production and development
7. Make app work properly on small mobile screens