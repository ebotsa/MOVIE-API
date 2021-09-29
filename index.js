const express = require('express');
const morgan = require('morgan');
const app = express();
bodyParser = require('body-parser'),
	uuid = require('uuid');
let movies = [{
		title: 'Mission: Impossible',
		director: 'Brian De Palma',
		genre: 'Action',
		BirthYear: 1940,
		ReleaseYear: 1996
	}, {
		title: 'Atomic Blonde',
		director: 'David Leitch',
		genre: 'Action thriller',
		BirthYear: 1975,
		ReleaseYear: 2017
	}, {
		title: 'Scott Pilgrim vs. The World',
		director: 'Edgar Wright',
		genre: 'Romance',
		BirthYear: 1974,
		ReleaseYear: 2010
	}, {
		title: 'The Spectacular Now',
		director: 'James Ponsoldt',
		genre: 'Romance',
		BirthYear: 1978,
		ReleaseYear: 2013
	}, {
		title: 'Love, Simon',
		director: 'Greg Berlanti',
		genre: 'Romantic comedy-drama',
		BirthYear: 1972,
		ReleaseYear: (2018)
	}, {
		title: 'The Big Sick',
		director: 'Michael Showalter',
		genre: 'Romantic comedy',
		BirthYear: 1970,
		ReleaseYear: 2017	
	}, {
		title: 'Up',
		director: 'Peter Hans Docter',
		genre: 'Comedy',
		BirthYear: 1968,
		ReleaseYear: 2001
	}, {
		title: 'Inside Out',
		director: 'Peter Hans Docter',
		genre: 'Comedy',
		BirthYear: 1968,
		ReleaseYear: 2015
	}, {
		title: 'Anchorman: The Legend of Ron Burgundy',
		director: 'Adam McKay',
		genre: 'Satirical comedy movie',
		BirthYear: 1968,
		ReleaseYear: 2004
	}, {
		title: 'Sarafina',
		director: 'Darrel Roodt',
		genre: 'Drama, Musical',
		BirthYear: 1962,
		ReleaseYear: 1992
	},],
	
	users = [{
		username: 'Sylvanus Agbor',
		id: '1',
		birthYear: '1984',
		favMovies: 'Drama, Musical',
		email: 'XXXXX@yahoo.com',
		password: 'mmmmm_6'
	}, {
		username: 'Blaise Okay',
		id: '2',
		birthYear: '1948',
		favMovies: 'Comedy',
		email: 'aaaaa@hotline.com',
		password: 'fffff_4'
	}, {
		username: 'User 3',
		id: '3',
		birthYear: '1962',
		favMovies: 'Drama, Musical',
		email: 'sss@gmail.com',
		password: 'zzzzz_6'
		
	}, {
		username: 'User 4',
		id: '4',
		birthYear: '1955',
		favMovies: 'Romance',
		email: 'bbb@yahoo.com',
		password: 'qqqqq_5'
	}, {
		username: 'User 5',
		id: '5',
		birthYear: '1992',
		favMovies: 'Drama, Musical',
		email: 'ccccc@yahoo.com',
		password: 'yyyyy_5'
	}],

	directors = [{
		name: 'Brian De Palma',
		birthYear: '1940'
	}, {
		name: 'David Leitch',
		birthYear: '1975'
	}, {
		name: 'Edgar Wright',
		birthYear: '1974'
	}, {
		name: 'James Ponsoldt',
		birthYear: '1978'
	}, {
		name: 'Greg Berlanti',
		birthYear: '1972'
	}, {
		name: 'Michael Showalter',
		birthYear: '1970'
	}, {
		name: 'Peter Hans Docter',
		birthYear: '1968'
	}, {
		name: 'Peter Hans Docter',
		birthYear: '1968'
	}, {
		name: 'Adam McKay',
		birthYear: '1968'
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
		res.send('Succesful POST request - new title added to favorites.')
	};
});
// Remove a movie from favorites
app.delete('/users/:username/favorites', (req, res) => {
	let toRemove = req.body;
	if(!toRemove.title) {
		const message = 'Missing title in request body';
		res.status(400).send(message);
	} else {
		res.send('Succesful DELETE request - title removed from favorites.')
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