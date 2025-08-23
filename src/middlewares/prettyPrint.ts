import { app } from "../app";

app.use((req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    res.setHeader('Content-Type', 'application/json');
    return oldJson.call(this, JSON.parse(JSON.stringify(data, null, 2)));
  };
  next();
});
