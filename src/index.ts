import cluster from "node:cluster";
import app from "./app";

const port = process.env.PORT || 3001;

cluster.setupPrimary({
  exec: "./dist/token.js",
});
cluster.fork();

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});
