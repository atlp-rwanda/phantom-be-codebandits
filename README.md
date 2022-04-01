[![CI](https://github.com/atlp-rwanda/phantom-be-codebandits/actions/workflows/main.yml/badge.svg)](https://github.com/atlp-rwanda/phantom-be-codebandits/actions/workflows/main.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/0a8e73d7e498e308d3db/maintainability)](https://codeclimate.com/github/atlp-rwanda/phantom-be-codebandits/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0a8e73d7e498e308d3db/test_coverage)](https://codeclimate.com/github/atlp-rwanda/phantom-be-codebandits/test_coverage) [![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/phantom-be-codebandits/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/phantom-be-codebandits?branch=develop)

# Phantom backend

## Introduction

This is a the backend repository for Phantom project which is an application that aims at addressing a problem of commuters in Kigali who spend a long time at the bus stations or in queues waiting for buses to come. it will allow simulating bus movements and enabling passengers to track their locations & movements.

- [] Check out Phantom frontend repository [linked here](https://github.com/atlp-rwanda/phantom-fe-codebandits)
- [] Check the hosted Frontend application [linked here](https://phantom-codebantis.herokuapp.com)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Pipeline

- Staging app [linked here](https://phantom-be-codebandits-staging.herokuapp.com/) use the `develop` branch
- Production app [linked here](https://phantom-be-codebandits-pro.herokuapp.com/) use `main` branch.

### Prerequisites

This project requires a terminal and a web browser or an API testing program to run and test. For development, it requires a code editor.

### Installation

The **`Docker compose file`** give you access to three images running on different ports and can talk to each other.

1. **Frontend image**: The react app is served under **http://localhost:3001**
2. **Backend image**: The node.js app served under **http://localhost:5000**
3. **Postgres Database**: The Postgres database running inside the container not open to the public. Only accessible through the backend application.

#### Development environment

Clone the project repository linked [here](https://github.com/atlp-rwanda/phantom-be-codebandits.git)

```git
git clone https://github.com/atlp-rwanda/phantom-be-codebandits
cd phantom-be-codebandits
touch .env // fill all required information as in .env.sample.md
npm install
//if you have postgres installed, start it
// if you want to use **Docker** follow
docker run --name phantom-postgres -e POSTGRES_PASSWORD=1234 -e POSTGRES_USER=phantom -d -p 5432:5432 postgres
npm run start // to start in watch mode use <npm run dev>
//open postman to http://localhost:5000/
// open the browser and got to http://localhost:5000/docs
```

### Configuration

You can configure the application with the following [environment variables]:

> Refer to the `.env.sample.md` file for the configuration required

#### Docker container for testing

To run this project, you will need to have the following:

- [Docker](https://www.docker.com/products/docker-desktop/) installed and running
- [Cloned this repository repository](https://github.com/atlp-rwanda/phantom-be-codebandits)

Follow the instructions below to get started:

```git
git clone https://github.com/atlp-rwanda/phantom-be-codebandits
cd phantom-be-codebandits
touch .env // fill all required information as in .env.sample.md
docker compose up --build  // to setup docker images
//open your browser to http://localhost:5000/
```

## Authors

- **Codebandits**
