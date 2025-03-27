const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("database/db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(router);

server.listen(4000, () => {
  console.log("JSON server is running on port 4000");
});