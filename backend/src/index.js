const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
//const multer = require('multer');


const app = express();

async function  connect(){
    await mongoose.connect('mongodb+srv://seminariosPUC:t86c2Rs6TC09AAgX@cluster0-bs4ii.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

connect();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//app.use(multer({dest:'./uploads'}).any());

app.use(cors({origin: '*'}));
//app.use(express.json());
app.use(express.json({limit: '5mb'}));
//app.use(express.urlencoded({limit: '50mb'}));
app.use(routes);

app.listen(3333);

//get -> busca //post -> insere //put -> modifica //delete -> deletar 
//Parâmetros: Query, route, body
// query -> request.query (filtros, ordenação, paginação...)
// route -> request.params (identificar um recuso na alteração ou remoçao)
// body -> request.body (Dados para criação ou alterção)



