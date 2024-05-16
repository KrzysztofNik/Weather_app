const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const fetch = require("node-fetch");
const port = 3001;

app.use(cors());
app.use('/api',routes);

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
