# journey-log-2.0

## Table of Contents
- [Description](#description)
- [Usage](#usage)
- [License](#license)
- [Technical Details](#technical-details)
- [Site Link](#site-link)
- [Dummy Login](#dummy-login)
- [Repository](#repository)

## Description 

Journey Log 2.0 is a React application that uses a number of different node packages and technologies. It uses GraphQL, @apollo/server, react-strap, Bootstrap, Vite, Express, bcrypt, JWT tokens, Nodemon, and Mongoose.

## Usage

To use this web application, first you must create a user. The signup button at the top brings you to a signup form page. Once you are signed in, you will be able to log in again after you logout. When a login is created, it will show the form to create a journey. This includes a text input section for the title as well as the body. There are character limits for both up to 280 characters. Once the user has made a post, they are then able to see all of their posts and also make a comment on the post. Other users are able to see your posts and make comments on them. The objective is for a user to go on a vacation and get recommendations on things to do, places to see, what to eat, etc. The user can see all of the posts and comments when they go to their profile and click on a post.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Technical Details

### Technologies Used

#### Client-Side

**React:**

- **React**: A JavaScript library for building user interfaces.
- **React DOM**: Provides DOM-specific methods that can be used at the top level of your app.
- **React Router DOM**: Declarative routing for React applications.
- **React Type Animation**: A type animation library for React.

**State Management and GraphQL:**

- **@apollo/client**: A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- **GraphQL**: A query language for your API and a runtime for executing those queries by using a type system you define for your data.

**Styling:**

- **@material-tailwind/react**: React components styled using Tailwind CSS.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **PostCSS and Autoprefixer**: Tools to transform CSS with JavaScript plugins and add vendor prefixes to CSS rules.

**Utility Libraries:**

- **jwt-decode**: A library for decoding JSON Web Tokens.
- **Nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

**Build Tools and Development:**

- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **@vitejs/plugin-react**: Vite plugin for React Fast Refresh.

**Linting and Formatting:**

- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **eslint-plugin-react**: An ESLint plugin for React.
- **eslint-plugin-react-hooks**: ESLint rules for React Hooks.
- **eslint-plugin-react-refresh**: An ESLint plugin for React Refresh.

**TypeScript Support (via DefinitelyTyped):**

- **@types/react**: TypeScript definitions for React.
- **@types/react-dom**: TypeScript definitions for React DOM.

#### Server-Side

**Node.js:**

- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

**GraphQL:**

- **@apollo/server**: Apollo Server is a community-maintained open-source GraphQL server.

**Database:**

- **MongoDB**: A source-available cross-platform document-oriented database program.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.

**Authentication and Security:**

- **bcrypt**: A library to help you hash passwords.
- **jsonwebtoken**: A library to create, sign, and verify JSON Web Tokens.

**Environment Management:**

- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

**Utility Libraries:**

- **Nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Site Link
[https://social-tast-app-bbbf51cc09c5.herokuapp.com/](https://social-tast-app-bbbf51cc09c5.herokuapp.com/)

## Dummy Login

- **Username**: Luke Skywalker
- **Email**: luke@mail.com
- **Password**: 12345

## Repository

[https://github.com/lopezivan763/journey-log-2.0](https://github.com/lopezivan763/journey-log-2.0)