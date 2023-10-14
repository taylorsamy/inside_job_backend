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

const bubblechart = async () => {
  const text = `WITH DistinctGenres AS (
    SELECT DISTINCT "Genre"
    FROM "Event"
)

SELECT
    dg."Genre",
    l."Name" AS location_name,
    DIV(COALESCE(SUM(r."Rating"), 0),5) AS avg_ratings_for_location,
    count(e.id) AS number_of_events
FROM
    DistinctGenres dg
JOIN
    "Event" e ON dg."Genre" = e."Genre"
JOIN
    "Location" l ON e."LocationID" = l.id
LEFT JOIN
    "Rating" r ON e.id = r."EventID"
GROUP BY
    dg."Genre",
    l."Name"
ORDER BY
    dg."Genre",
    l."Name";`;
  const result = await query(text);
  return result;
}

module.exports = {
  query,
  pool,
  bubblechart,
};
