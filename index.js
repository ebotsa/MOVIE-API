const express = require('express');
const morgan = require('morgan');
const app = express();
bodyParser = require('body-parser'),
	uuid = require('uuid');
let movies = [{
		title: 'Movie 1',
		director: 'Director 1',
		genre: 'Genre 1'
	}, {
		title: 'Movie 2',
		director: 'Director 2',
		genre: 'Genre 1'
	}, {
		title: 'Movie 3',
		director: 'Director 3',
		genre: 'Genre 1'
	}, {
		title: 'movie 4',
		director: 'Director 4',
		genre: 'Genre 1'
	}, {
		title: ' Movie 5',
		director: 'Director 5',
		genre: 'Genre 1'
	}, {
		title: 'Movie 6',
		director: 'Director 6',
		genre: 'Genre 2'
	}, {
		title: 'Movie 7',
		director: 'Director 7',
		genre: 'Genre 2'
	}, {
		title: 'Movie 8',
		director: 'Director 8',
		genre: 'Genre 2'
	}, {
		title: 'Movie 9',
		director: 'Director 9',
		genre: 'Genre 2'
	}, {
		title: 'Sarafina',
		director: 'Darrel Roodt',
		genre: 'Drama, Musical'
	}, ],
	users = [{
		username: 'Sylvanus Agbor',
		id: '1'
	}, {
		username: 'Blaise Okay',
		id: '2'
	}, {
		username: 'User 3',
		id: '3'
	}, {
		username: 'User 4',
		id: '4'
	}, {
		username: 'User 5',
		id: '5'
	}],
	directors = [{
		name: 'Director 1',
		birthYear: '1984'
	}, {
		name: 'Director 2',
		birthYear: '1957'
	}, {
		name: 'Director 3',
		birthYear: '1982'
	}, {
		name: 'Director 4',
		birthYear: '1970'
	}, {
		name: 'Director 5',
		birthYear: '1948'
	}, {
		name: 'Director 6',
		birthYear: '1955'
	}, {
		name: 'Director 7',
		birthYear: '1966'
	}, {
		name: 'Director 8',
		birthYear: '1977'
	}, {
		name: 'Director 9',
		birthYear: '1953'
	}, {
		name: 'Darrel Roodt',
		birthYear: '1962'
	}, ];
//list of all the movies
app.get('/movies', (req, res) => {
	res.json(movies);
});
//list of all the directors
app.get('/directors', (req, res) => {
	res.json(directors);
});
//data on a movie by title
app.get('/movies/:title', (req, res) => {
	res.json(movies.find((movie) => {
		return movie.title === req.params.title
	}));
});
// data about the genre by title
app.get('movies/:title', (req, res) => {
	res.json(movies.find((movie) => {
		return movie.title === req.params.title
	}));
});
//list of all the users
app.get('/users', (req, res) => {
	console.log();
	res.json(users);
});
//info on director by name
app.get('/directors/:name', (req, res) => {
	res.json(directors.find((director) => {
		return director.name === req.params.name
	}));
});
//user's data by name
app.get('/users/:username', (req, res) => {
	res.json(users.find((user) => {
		return user.username === req.params.username
	}));
});
//adding new user
app.post('/users', (req, res) => {
	let newUser = req.body;
	if(!newUser.username) {
		const message = 'Missing name in request body';
		res.status(400).send(message);
	} else {
		newUser.id = uuid.v4();
		users.push(newUser);
		res.status(201).send(newUser);
	};
});
// Deletes a user by ID
app.delete('/users/:id', (req, res) => {
	let user = users.find((user) => {
		return user.id === req.params.id
	});
	if(user) {
		users = users.filter((obj) => {
			return obj.id !== req.params.id
		});
		res.status(201).send('User ' + req.params.id + ' was deleted.');
	}
});
// Add a movie to favorites
app.post('/users/:username/favorites', (req, res) => {
	let newfavorite = req.body;
	if(!newfavorite.title) {
		const message = 'Missing title in request body';
		res.status(400).send(message);
	} else {
		res.send('Succesful POST request - new title added to favs.')
	};
});
// Remove a movie from favorites
app.delete('/users/:username/favorites', (req, res) => {
	let toRemove = req.body;
	if(!toRemove.title) {
		const message = 'Missing title in request body';
		res.status(400).send(message);
	} else {
		res.send('Succesful DELETE request - title removed from favs.')
	};
});
// Update the username
app.put('/users/:username', (req, res) => {
	let user = users.find((user) => {
		return user.username === req.params.username
	});
	if(user) {
		user[req.params.username] = parseInt(req.params.username);
		res.status(201).send('Sucsessful PUT request: User ' + req.params.username + ' changed his username.');
	} else {
		res.status(404).send('User with the name ' + req.params.username + ' was not found.');
	}
});
//list of favorites of a single user
app.get('/users/:username/favorites', (req, res) => {
	res.send('Successful GET request returning data on favorite movies of a single user.');
});
//GET route ‘movies’ that returns JSON Object
app.get('/movies', (req, res) => {
	res.json(movies);
});

//GET route ‘text’ that returns default textual response
app.get('/documentation', (req, res) => {
	res.sendFile('public/documentation.html', {
		root: __dirname
	});
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
	console.log('movie_api is listening on port 8080.');
});