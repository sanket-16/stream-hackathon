const express =  require('express');
const Cors = require('cors');
const app = express();
require('dotenv').config();
const authRoutes = require('./src/routes/auth.js')
app.use(Cors());
app.use(express.json());

app.use("/auth",authRoutes)

app.listen(8080 , ()=>{
    console.log("Server Running");
})