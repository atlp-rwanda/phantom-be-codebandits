# Phantom backend

This is a the backend repository for Phantom project which is an application that aims at addressing a problem of commuters in Kigali who spend a long time at the bus stations or in queues waiting for buses to come. it will allow simulating bus movements and enabling passengers to track their locations & movements.

check out Phantom frontend repository [linked here](https://github.com/atlp-rwanda/phantom-fe-codebandits)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Pipeline

- Staging app [linked here](https://phantom-codebandits-staging.herokuapp.com/) use the `develop` branch
- Production app [linked here](https://phantom-codebandits-pro.herokuapp.com/) use `main` branch.

### Prerequisites

This project requires a terminal and a web browser or an API testing program to run and test. For development, it requires a code editor.

### Installation

Clone the project repository linked [here](https://github.com/atlp-rwanda/phantom-be-codebandits.git)

```
cd phantom-be-codebandits/
git fetch origin
npm install
```

### Configuration

You can configure the application with the following [environment variables]:

- **`PORT`**: The HTTP port to run the application on.<br/>
  Default: `5000`.

- **`LOG_LEVEL`**: The lowest level of logs to output, one of `error`, `warn`, `info`, `verbose`, `debug`.<br/>
  Default:`info` in development.

- **`SERVER_URL`**: server link of the project currently being used in Swagger documentation configuration<br/>
  Default: `"http://localhost:5000/"`

## Running the app

```
npm run start
```

## Authors

- **Codebandits**
