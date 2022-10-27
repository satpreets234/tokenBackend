const express = require('express');
const app = express()
const port = process.env.PORT || 3010;
const cors=require('cors');
app.use(cors())
const dotenv=require('dotenv');
dotenv.config();
const connect=require('./connection/connection');
connect();

const userRouter=require('./routes/user-routes');
const tokenRouter=require('./routes/token-routes');

app.use(express.json());
app.use('/user',userRouter);
app.use('/token',tokenRouter);

// const errHandler=()=>{

// }
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))