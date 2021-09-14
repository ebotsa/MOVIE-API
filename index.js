const express = require('express');
    const morgan = require('morgan');
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
 res.json(myTopTenMovies);
});
 
//GET route ‘text’ that returns default textual response
app.get('/documentation', (req, res) => {
res.sendFile('public/documentation.html', { root: __dirname });
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
app.listen(8080, () => {
console.log('Your app is listening on port 8080.');
});