const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/user');
const taskRoute = require('./routes/task')
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}));
app.use(cookieParser());

app.use('/api/v1',router);
app.use('/api/v1',taskRoute);

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server Runing at http://localhost:${PORT}`);
    
})