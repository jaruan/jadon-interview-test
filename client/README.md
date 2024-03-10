# Jadon Interview Test For Client

## Introduction

This web client based on **Vite**, **React**, **TypeScript**, and **Ant Design** combines several powerful tools and libraries to create a modern, type-safe, and visually appealing UI.

### Requirements

- Docker engine
- Docker Compose
- Node.js

## Quick Start

**Notes:**
The client relies on the server to provide the data source, so make sure the server is started before you run the following command, please refer to [here]() for details.

### Running locally via docker-compose

```shell
docker-compose -f docker-compose.yml up
```

After running the application via docker, please click <http://localhost:3000> to visit the page

**Notice**

- If you would like to stop the client container, you can execute the following command.

```shell
docker-compose -f docker-compose.yml down
```

- If codes have been changed, please rebuild the docker image.

```shell
docker-compose -f docker-compose.dev.yml up --build
```

## Development

### Setting the specified Node.js version

```shell
nvm use
```

### Installing

```shell
npm install
```

### Running

```shell
npm run dev
```

### Testing

```shell
npm run test
```

### Coverage

```shell
npm run coverage
```
