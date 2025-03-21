import axios from 'axios';
import pg from 'pg';
const { Client } = pg;

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'bitcoin',
  password: 'password',
  port: 5432,
});

async function fetchData() {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`);
    
    // Преобразуем данные для хранения в БД
    const prices = response.data.prices;
    prices.forEach(async (price) => {
      const timestamp = new Date(price[0]);
      const priceValue = price[1];
      
      await client.query('INSERT INTO prices (price, timestamp) VALUES ($1, $2)', [priceValue, timestamp]);
      console.log(`Price saved: $${priceValue} at ${timestamp}`);
    });
  } catch (error) {
    console.error('Error while fetching or saving data:', error.message);
  }
}

(async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    await fetchData();
    setInterval(fetchData, 60000);
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error.message);
    process.exit(1);
  }
})();