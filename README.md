# To-do List API
A simple API for creating, retrieving, updating and deleting items in a to-do list.

# Installation
## Pre-requisites
This application has been tested and deployed with the following node and npm versions:
| Pre-requisite | Version  |
| ------------- | -------- |
| node          | v18.14.0 |
| npm           | 9.3.1    |

1. Clone this repository on your local machine.
2. Run `npm install` inside the repository folder. Make sure to change directory first.
3. Create or edit the `.env` file according to your needs. You can copy the contents from the template `.env.[environment]` files.
4. Run `npm start` to start the server.
5. If `NODE_ENV` is set to `development`, you can access Swagger UI via `localhost:3000/api-docs`.Similarly, the OpenAPI spec file can also be retrieved via `localhost:3000/openapi/spec`.
6. To run unit tests, do `npm run test`. To generate coverage files, you can run `npm run test:coverage` instead.

Alternatively, you can build and run the app using Docker.
1. Clone this repository on your local machine.
2. Change directory to inside the repository and run `docker build -t todolistapi .`. Feel free to replace `todolistapi` with your desired tag.
3. Once the build succeeds, you can run it via `docker run -p 3000:3000 -d todolistapi`.
4. By default, the Dockerfile uses the `.env.production` template as the main `.env`. To control the options, feel free to pass the specific environment variables during `docker run`. For example:
```bash
docker run -d \
-e NODE_ENV=development \
-e SQLITE_STORAGE=/opt/todolistapi/database.sqlite \
-p 3000:3000 \
todolistapi
```
