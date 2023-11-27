const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    console.log('hello from Martin');
    res.status(200)
    res.json({message: 'hello from Martin'})
})

module.exports = app;