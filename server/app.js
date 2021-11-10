// create your express server below
const express = require('express');
const morgan = require("morgan");
const axios = require('axios');
const cache = {url: null, data: null};

// requests 
const app = express();

// add your routes and middleware below
app.use(morgan('dev'))
app.get('/', (req, res) => {
    if(req.query.i ){

    if(cache.url === req.query.i){
        res.send(cache.data);
        }

    axios.get('http://www.omdbapi.com/?i=' + req.query.i + '&apikey=8730e0e')
        .then(response => {   
            cache.data = response.data;
            cache.url = req.query.i
            res.json(response.data)
        })
        .catch(err => res.json(err.message));
        
        } else if(req.query.t){

        if (cache.url === req.query.t){
        res.send(cache.data);
        }

    axios.get('http://www.omdbapi.com/?t=' + encodeURIComponent(req.query.t) + '&apikey=8730e0e')
        .then(response => {   
            cache.data = response.data;
            cache.url = req.query.t
            res.json(response.data)
        })
        .catch(err => res.json(err.message));
        
        } else res.json("Success");
});

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
module.exports = app;