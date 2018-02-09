const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ctrl = require('./controllers/search_controller.js');

const port = 3005;

app.use(bodyParser.json());

app.get('/api/', ctrl.getSearch);

app.listen(port, () => console.log(`Listening on port ${port}`));