var express = require("express");
var router = express.Router();
const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "bsale_test",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET all products
router.get("/products", (req, res) => {
  connection.query("SELECT * FROM product", (err, result, fields) => {
    if (err) throw err;
    res.send(result);
  });
});

// GET all categories
router.get("/category", (req, res) => {
  connection.query("SELECT * FROM category", (err, result, fields) => {
    if (err) throw err;
    res.send(result);
  });
});

// Items from a specific category
router.get("/category/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM product WHERE category = ${id}`,
    (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Keep alive
setInterval(function () {
  connection.query("SELECT 1");
}, 2000);

module.exports = router;
