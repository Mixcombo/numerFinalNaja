const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createPool({
  host: "db" || process.env.DB_HOST,
  user: "root" || process.env.DB_USER,
  password: "Mixer4422" || process.env.DB_PASSWORD,
  database: "numerdb" || process.env.DB_NAME,
  port: "3306" || process.env.DB_PORT
});

const secretKeys = "mixer"

app.get("/gettoken/:name", (req, res) => {
  console.log(req.params.name);
  const token = jwt.sign({ user: req.params.name }, secretKeys);
  console.log("get token successfully");
  res.send(token);
});

function authorization(req, res, next) {
  let token = req.headers["authorization"];
  if (token === undefined) {
    res.send("don't have authorization");
  } else {
    try {
      token = token.split(" ")[1];
      console.log(token);
      let decode = jwt.verify(token, secretKeys);
      console.log(decode);
      if (decode.user === "mixer") {
        next();
      } else {
        res.send("pls authen");
      }
    } catch {
      res.send("no correct");
    }
  }
}

app.post("/data", authorization, (req, res) => {
  let d = JSON.stringify(req.body);
  const q = `SELECT * from multi where multicol='${JSON.stringify(req.body)}'`;
  db.query(q, (err, data) => {
    console.log("ok");
    if (err) return res.json(err);
    if (data.length > 0) {
      console.log("have data");
      res.send("multicol have data");
    } else {
      console.log("no have data");
      const q1 = `INSERT INTO multi(multicol,num) VALUES (?,?)`;
      db.query(q1, [d, req.body.numgen], (err) => {
        if (err) return res.json(err);
        console.log("add multicol");
        res.send("add multicol successfully");
      });
    }
  });
});

app.post("/getdata", (req, res) => {
  const q = `SELECT * FROM multi where num=${req.body.numgen}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    const n = Math.floor(Math.random() * data.length);
    res.send(data[n]);
  });
});


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(5000, () => {
  console.log("connect! port");
});

module.exports = app;