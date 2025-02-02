const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Example route
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
