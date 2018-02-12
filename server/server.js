const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ctrl = require('./controllers/search_controller.js');

const port = 3005;

app.use(bodyParser.json());

app.get('/api/items', ctrl.getSearch);
app.post('/api/items', ctrl.newSearch);

app.get('/api/recommends/:id', ctrl.getRec);
app.post('/api/recommends/:id', ctrl.newRec);
app.put('/api/recommends/:id', ctrl.editRec);
app.delete('/api/recommends/:mainId/:recId', ctrl.deleteRec)

app.put('/api/recommends/:mainId/:recId/up', ctrl.upVote)
app.put('/api/recommends/:mainId/:recId/down', ctrl.downVote)

app.listen(port, () => console.log(`Listening on port ${port}`));