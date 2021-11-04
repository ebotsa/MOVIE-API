const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser'),
	uuid = require('uuid');
const mongoose = require('mongoose');
const cors = require('cors');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Directors;
const {
	check, validationResult
} = require('express-validator');
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());
const passport = require('passport');
app.use(passport.initialize());
require('./passport');
let auth = require('./auth')(app);
app.use(morgan('common'));
app.use(express.static('public'));
// Get welcome page
app.get('/', (req, res) => {
	res.send('Welcome to MyFlix!');
});
//Get a list of all movies
app.get("/movies", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Movies.find().then(movies => {
		res.status(200).json(movies);
	}).catch(error => {
		console.error(err);
		res.status(500).send("Error: " + err);
	});
});
// Get a movie by title
app.get("/movies/:Title", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Movies.findOne({
		Title: req.params.Title
	}).then(movie => {
		res.json(movie);
	}).catch(err => {
		console.error(err);
		res.status(500).send("Error: " + err);
	});
});
// Get all users
app.get("/users", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Users.find().then(users => {
		res.status(201).json(users);
	}).catch(error => {
		console.error(err);
		res.status(500).send("Error: " + err);
	});
});
//Get a user by username
app.get("/users/:Username", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Users.findOne({
		Username: req.params.Username
	}).then(user => {
		res.json(user);
	}).catch(err => {
		console.error(err);
		res.status(500).send("Error: " + err);
	});
});
//Remove an existing user
app.delete("/users/:Username", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Users.findOneAndRemove({
		Username: req.params.Username
	}).then(user => {
		if(!user) {
			res.status(400).send(req.params.Username + " was not found");
		} else {
			res.status(200).send(req.params.Username + " was deleted.");
		}
	}).catch(err => {
		console.error(err);
		res.status(500).send("Error: " + err);
	});
});
// Update a user's info, by username
app.put('/users/:Username', passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Users.findOneAndUpdate({
			Username: req.params.Username
		}, {
			$set: {
				Username: req.body.Username,
				Password: req.body.Password,
				Email: req.body.Email,
				Birthday: req.body.Birthday
			}
		}, {
			new: true
		}, // This line makes sure that the updated document is returned
		(err, updatedUser) => {
			if(err) {
				console.error(err);
				res.status(500).send('Error: ' + err);
			} else {
				res.json(updatedUser);
			}
		});
});
//Add a user
app.post('/users',
	// Validation logic here for request
	//you can either use a chain of methods like .not().isEmpty()
	//which means "opposite of isEmpty" in plain english "is not empty"
	//or use .isLength({min: 5}) which means
	//minimum value of 5 characters are only allowed
	[
		check('Username', 'Username is required').isLength({
			min: 5
		}),
		check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
		check('Password', 'Password is required').not().isEmpty(),
		check('Email', 'Email does not appear to be valid').isEmail()
	], (req, res) => {
		let hashedPassword = Users.hashPassword(req.body.Password);
		Users.findOne({
				Username: req.body.Username
			}) // Search to see if a user with the requested username already exists
			.then((user) => {
				if(user) {
					//If the user is found, send a response that it already exists
					return res.status(400).send(req.body.Username + ' already exists');
				} else {
					Users.create({
						Username: req.body.Username,
						Password: hashedPassword,
						Email: req.body.Email,
						Birthday: req.body.Birthday
					}).then((user) => {
						res.status(200).json(user)
					}).catch((error) => {
						console.error(error);
						res.status(500).send('Error: ' + error);
					});
				}
			}).catch((error) => {
				console.error(error);
				res.status(500).send('Error: ' + error);
			});
	});
// Get genre by name
app.get("movie/genre/:Name", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Genre.findOne({
		Name: req.params.Name
	}).then(genre => {
		res.json(genre);
	}).catch(err => {
		console.error(err);
		res.status(500).send("Error: " + err);
	});
});
// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
	Users.findOneAndUpdate({
			Username: req.params.Username
		}, {
			$push: {
				FavoriteMovies: req.params.MovieID
			}
		}, {
			new: true
		}, // This line makes sure that the updated document is returned
		(err, updatedUser) => {
			if(err) {
				console.error(err);
				res.status(500).send('Error: ' + err);
			} else {
				res.json(updatedUser);
			}
		});
});
// Remove a movie from favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
	Users.findOneAndUpdate({
			Username: req.params.Username
		}, {
			$pull: {
				FavoriteMovies: req.params.MovieID
			}
		}, {
			new: true
		}, // This line makes sure that the updated document is returned
		(err, updatedUser) => {
			if(err) {
				console.error(err);
				res.status(500).send('Error: ' + err);
			} else {
				res.json(updatedUser);
			}
		});
});
//Get director by name
app.get("movie/directors/:Name", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Directors.findOne({
		Name: req.params.Name
	}).then(director => {
		res.json(director);
	}).catch(err => {
		console.error(err);
		res.status(500).send("Error: " + err);
	});
});
// Error-handling middleware function
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
	console.log('Listening on Port ' + port);
});
//To listen locally:
/*app.listen(8080,() => {
    console.log('movie_api is listening on port 8080.');
});*/