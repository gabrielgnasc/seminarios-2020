const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://seminariosPUC:t86c2Rs6TC09AAgX@cluster0-bs4ii.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(routes);

app.listen(3333);

//get -> busca //post -> insere //put -> modifica //delete -> deletar 
//Parâmetros: Query, route, body
// query -> request.query (filtros, ordenação, paginação...)
// route -> request.params (identificar um recuso na alteração ou remoçao)
// body -> request.body (Dados para criação ou alterção)



