const express = require('express');
const app = express();
app.use(express.json());
const countries = require('./routes/Country.routes');
app.use('/api/country',countries);
app.listen(3000, () => console.log("Waiting for port 3000 ..."));

