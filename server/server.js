const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const {readdirSync} = require('fs');
require('dotenv').config();


//import routes
const authRoutes = require('./routes/auth')
//app
const app = express();

//DB
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true
})
.then(()=>console.log('DB connected'))
.catch(err => console.log('DB CONNECTION ERR ',err));

//middlewares
app.use(morgan('dev'));
app.use(bodyparser.json({limit: "2mb"}));
app.use(cors());

//route middleware
//app.use('/api',authRoutes);
readdirSync('./routes').map((r) => 
 app.use("/api",require('./routes/'+r))
 );


// port
const port = process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Server is running on port ${port}`));