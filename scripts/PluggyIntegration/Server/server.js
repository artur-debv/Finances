import express from 'express';
import fetch from 'node-fetch';

const app = express();  // Aqui, utilize 'express()' ao invés de 'Express()'
const port = 3000;



const PLUGGY_API_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZmUyN2VlODViNmIyZTI0MWI3ODk1OGM1NWZkODcxZWI6OGQ4MDJhODNkYmJiZTY1MTQ0MDMzYzdiZGM3ZmI1MGNlMmExM2U4YzBkODRiNGQ4NmEwYmRjNWM3ZjIwZGExNzFkYzg1ODU5NzZhODFiOThiNGRiYjFiY2Y2OThjNTgwMTcxYjI4NDY5YTcxNDVjZmQ1ZjU1ODBkZWQ4ZWM4ZDM1MTliYWJiY2ExMWYyOWZkZmExZTY5ODJjYjA1ZjkyYyIsImlhdCI6MTcyNjIzMjIwNCwiZXhwIjoxNzI2MjM5NDA0fQ.ouAo68MAOJLXKprVZBj3Lpe43b32y22BbHHYzVYLR3Idjbe8oErZNaV4Deto84zEJAO0IwXsODMaRqwPzxgmK8HZKiVt9eyfdJg7dI27HvoNOJ_YjmO4R36CAYRQZDQSlnukbQLmK7U09EaM9joiQYgYvIwdfwtMUJY4KuakxaNSIbMDIILa67xypgvlRrXLANcQpOOu1psiOc-pjOZuAhWwVfRke619tYtE6bEn6rXCID7Kl2YKKMNqfszCLW_tXziNOVz8cqNWvxxOQ8oAtRqj4ybzcawStbr-HWBN0FoU9CP-lUZJTTlFCoUQDgo52iOpECuJ56KjhVBG0bRQnQ';

app.post('/api/getConnectToken', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': PLUGGY_API_KEY
    }
  };

  try {
    const response = await fetch('https://api.pluggy.ai/connect_token', options);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Erro ao obter token de acesso:', err.message);
    res.status(500).send('Erro ao obter token de acesso');
  }
});

app.get('/api/getTransactions', async (req, res) => {
  const { accountId } = req.query;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${PLUGGY_API_KEY}`
    }
  };

  try {
    const response = await fetch(`https://api.pluggy.ai/accounts/${accountId}/transactions`, options);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    const transactions = await response.json();
    res.json(transactions);
  } catch (err) {
    console.error('Erro ao buscar transações:', err.message);
    res.status(500).send('Erro ao buscar transações');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

