const express = require('express');
const app = express();

let myTopTenMovies = [{
    title: 'Movie 1',
},

{
    title: 'Movie 2',
},

{
    title: 'Movie 3',
},

{
    title: 'movie 4',
},

{
    title: ' Movie 5',
},

{
    title: 'Movie 6',
},

{
    title: 'Movie 7',
},

{
    title: 'Movie 8',
},

{
    title: 'Movie 9',
},

{
    title: 'Movie 10',
},
];

//GET route ‘movies’ that returns JSON Object
app.get('/movies', (req, res) => {
 res.json(movies);
});
 
//GET route ‘text’ that returns default textual response
app.get('/document', (req, res) => {
res.send('public/document.html', { root: __movie_api });
});

// Function for sending static files
app.use(express.static('public'));

// Logging morgan middleware library
app.use(morgan('common'));

// Error-handling middleware function 
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).send('Something broke!');
});


