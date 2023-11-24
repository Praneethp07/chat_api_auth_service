const express = require('express');
const App = express();
const Port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const {json} = require("express");
const apiRoutes = require('./Routes/authRoute');
App.use(bodyParser.json());
App.use(cors());
function invaild(req,res){
    res.json('invalid route');
}
App.use('/api/organizations/',apiRoutes);
App.get('/api/organizations',invaild);
App.get('/api',invaild);
App.get('/',(req,res) => {
    res.json("sign up/login");
});

App.listen(Port,function (){
    console.log(`Auth service is running on http://localhost:${Port}`);
});

