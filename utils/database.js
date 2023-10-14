const Pool = require("pg").Pool;
require("dotenv").config();
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
});

const query = async (text) => {
  // const client = pool.connect();
  try {
    const result = await pool.query(text);
    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    }

  } catch (err) {
    return err.stack;
  } finally {
    // client.release();
  }
};

module.exports = {
  query,
  pool,
};
