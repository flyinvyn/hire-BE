<br />
<p align="center">
  <div align="center">
    <img height="150" src="https://cdn.discordapp.com/attachments/1118733891738554480/1147830303457550416/Screenshot_120-removebg-preview.png" alt="piword" border="0"/>
  </div>
  <h3 align="center">Peworld</h3>
  <p align="center">
    <a href="https://github.com/flyinvyn/hire-BE"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://hire-fe.vercel.app/">View Demo</a>
    ·
    <a href="https://hire-be.vercel.app/">Api Demo</a>
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
  - [Documentation](#documentation)
  - [Related Project](#related-project)

# About The Project

Peworld applications are software designed to help individuals search and apply for jobs according to their qualifications, interests, and preferences. This application has changed the way people search for jobs and the interaction between job seekers and companies that need workers.

## Built With

These are the libraries and service used for building this backend API

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Json Web Token](https://jwt.io)
- [Multer](https://github.com/expressjs/multer)

# Installation

1. Clone this repository

```sh
git clone https://github.com/flyinvyn/hire-BE
```

2. Change directory to markisak-be

```sh
cd hire-BE
```

3. Install all of the required modules

```sh
npm i / install
```

4. Create PostgreSQL database, query are provided in [query.sql](./query.sql)

5. Create and configure `.env` file in the root directory, example credentials are provided in [.env.example](./.env.example)

```txt
- Please note that this server requires Google Drive API credentials and Gmail service account
- Otherwise API endpoint with image upload and account register won't work properly
```

6. Run this command to run the server

```sh
npm run server
```

- Or run this command for running in development environment

```sh
npm run dev
```

- Run this command for debugging and finding errors

```sh
npm run lint
```

## Documentation

Documentation files are provided in the [docs](./docs) folder

- [Postman API colletion]()
- [PostgreSQL database query](./query.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/25981147/2s9YC4VDZH)

## Related Project

:rocket: [`Backend Hiring App`](https://github.com/flyinvyn/hire-BE)

:rocket: [`Frontend Hiring App`](https://github.com/flyinvyn/Hire-fe)

:rocket: [`Demo Hiring App`](https://hire-fe.vercel.app/)

Project link : [https://github.com/flyinvyn/hire-BE](https://github.com/flyinvyn/hire-BE))
