const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const env = require('node-env-file'); // .env file
env(__dirname + '/.env');

require('./src/database');



//settings
app.set('port', process.env.PORT || 4000);

app.get('/', (req, res) => {

    const htmlResponse = 
    `
        <html>
            <head>
            <title>NodeJS y Express en Vercel</title>
            </head>
            <body>
                Backen desplegado en Vercel Correctamente
            </body>
        </html>
        `
    res.send(htmlResponse);   
});


app.listen(app.get('port'));
console.log('Server on port ', app.get('port'));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'src/index.html')));
app.use(express.json());
app.use(require('cors')());

//routes
app.use('/api', require('./src/routes/index'));
