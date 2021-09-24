const Pool = require("pg").Pool;

const pool = new Pool({
  user: "abannow",
  host: "localhost",
  database: "graphql",
  password: "kyp29867",
  port: 5432,
});

const getDogs = (req, res) => {
  pool.query("SELECT * FROM dogs ORDER BY id ASC", (err, results) => {
    if (err) {
      throw err;
    }

    return res.status(200).json(results.rows);
  });
};

module.exports = {
  getDogs,
};
