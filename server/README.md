# Jadon Interview Test For Server

## Introduction

This web server based on the **Spring Boot** framework is a powerful and efficient solution for building web applications. By integrating JPA (Java Persistence API) and MySQL, you can easily store and retrieve data from a relational database.

### Requirements

- Docker engine
- Docker Compose
- JDK 11
- Maven 3.9
- Spring Boot 2.7

## Quick Start

### Running locally via docker-compose

Please follow steps to run the web server locally.

First, package the source code and export `jar`

```shell
bash package.bat
```

Second, run the web server via `docker-compose`. The server and database both will be started up.

```shell
docker-compose -f docker-compose.dev.yml up
```

host: <http://localhost:8080>

**Notice**

- If you would like to stop the server container, you can execute the following command.

```shell
docker-compose -f docker-compose.yml down
```

- If codes have been changed, please rebuild the docker image.

```shell
docker-compose -f docker-compose.dev.yml up --build
```

### Explore Rest APIs

Once the application is running, you can explore the swagger API doc: <http://localhost:8080/swagger-ui.html#/books>

## Development

**Environments**

- **development**
  Building the combination of server and database locally without any coding works in backend. It usually focus on developing front-end or reviewing API endpoints.

- **local**
  Building the server locally with any coding works.

  Since coding works rely the data persistence, we can build a testing database via `docker-compose`.

  ```shell
  docker-compose -f docker-compose.local.yml
  ```

### Unit Test

Basics of Unit Testing, including `controller` and `service`
