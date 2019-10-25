const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const client = require('./config/redis-client');
const cors = require('cors')

dotenv.config({path:'./config.env'});

const app = express();


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev')); //enable additional info in terminal about outcoming and incoming requests 
    app.use(cors()); //enable to all routes to get data only if it is development mode..
    
}

app.use('/api/v1/hotel/', require('./routes/hotel'))

const port = process.env.PORT || 8000;

app.listen(port , ()=>{
    console.log(`Server running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})