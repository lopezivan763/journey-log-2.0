# Journey Log 2.0

## Table of Contents
- [Description](#description)
- [Usage](#usage)
- [License](#license)
- [Technical Details](#technical-details)
- [Site Link](#site-link)
- [Dummy Login](#dummy-login)
- [Repository](#repository)

## Description 

Journey Log 2.0 is a dynamic React application designed for travelers to share and explore travel experiences. Users can easily sign up, log in, and create posts about their journeys, including titles and detailed descriptions. Each post is visible to other users, who can comment and provide recommendations on activities, places to visit, and dining options. The application offers a streamlined interface for managing posts and comments through user profiles, fostering a community of travel enthusiasts sharing valuable insights and tips.

## Usage

- **Create an Account**: Click the signup button at the top to register.
- **Login**: After signing up, you can log in anytime.
- **Create a Journey**: Once logged in, create a journey by filling out a form with a title and body, each limited to 280 characters.
- **View and Comment**: View your posts and others' posts, and leave comments. Share recommendations on activities, sights, food, and more.
- **Profile Management**: Access all posts and comments through your profile.

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

[Journey Log 2.0](https://social-tast-app-bbbf51cc09c5.herokuapp.com/)

## Dummy Login

- **Username**: Luke Skywalker
- **Email**: luke@mail.com
- **Password**: 12345

## Repository

[Journey Log 2.0 Repository](https://github.com/lopezivan763/journey-log-2.0)