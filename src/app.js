const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const notesRouter = require('./Routes/NotesRouter/NotesRouter.js');
const categoryRouter = require('./Routes/CategoryRouter/CategoryRouter.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/notes', notesRouter);
app.use('/api/category', categoryRouter);

module.exports = app;