import pg from 'pg';
const { Client } = pg;

export default defineEventHandler(async (event) => {
  const client = new Client({
    user: "postgres",
    host: "db",
    database: "bitcoin",
    password: "password",
    port: 5432,
  });

  try {
    await client.connect();

    const query = getQuery(event);
    if (!query.days) {
      return { error: 'Параметры "days" не валидны' };
    }

    const days = query?.days || '1';

    const result = await client.query(
      `SELECT * FROM prices 
       WHERE timestamp > NOW() - INTERVAL '${days} days' 
       ORDER BY timestamp ASC`
    );
    console.log('Data from DB:', result.rows); 

    return result.rows;
  } catch (error) {
    console.error("Database error:", error.message);
    return { error: error.message };
  } finally {
    await client.end();
  }
});
