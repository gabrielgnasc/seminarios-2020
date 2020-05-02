const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')


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

app.use(cors({origin: '*'}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'uploads'))
);

app.use(routes);

app.listen(3333);




