import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(
  path.join(process.cwd(), "database", "db.json")
);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.use(jsonServer.bodyParser);

server.listen(3001, () => {
  console.log("Server is running on: http://localhost:3001");
});
