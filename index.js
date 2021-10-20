const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser'),
uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');
app.use(morgan('common'));
app.use(express.static('public'));


// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


let movies = [{
  title: 'Silence of the Lambs',
  Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
  director: 'Jonathan Demme',
  Birth: 1944,
  Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
  genre: 'Thriller',
  Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
  ImagePath: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UY148_CR0,0,100,148_.jpg",
  "Featured": true

}, {
  title: 'UP',
  Description: '78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.',
  director: 'Pete Docter',
  Birth: '1968-10-09',
  Bio: 'Pete Docter is an American producer, writer, director, and an Oscar award winner.',
  genre: 'Comedy',
  Description: 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.',
  Imagepath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPY24DkRHaP3jzZqhffFHjLV6uiIKdcdFh07J66u6X&usqp=CAE&s", "Featured": true

}, {
  title: 'Inside Out',
  Description: "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions conflict on how best to navigate a new city, house, and school.",
  director: 'Peter Hans Docter',
  Birth: "1968-10-09",
  Bio: "Pete Docter is an American producer, writer, director, and an Oscar award winner.",
  genre: 'Comedy',
  Description: 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.',
  Imagepath: " https://www.filmjabber.com/movie-poster-thumbs/inside-out-movie-poster-5133.jpg", "Featured": true,
  
},
  
{
  title: 'The Notebook',
  Description: "Two young lovers are torn apart by war and class differences in the 1940s in this adaptation of Nicholas Sparks best-selling novel",
  director: 'Nick Cassavetes',
  Birth: '1959',
  Bio: 'Nick Cassavetes Nicholas David Rowland Cassavetes is an American actor, director, and writer',
  genre: 'Romance',
  Description: 'Most often, romance as a film genre is understood to be love stories, emotion-driven stories that are primarily focused on the relationship between the main characters of the story.',
  Imagepath: "https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_.jpg", "Featured": false
  
}, {
  title: 'Song One',
  Description: "After a terrible accident puts her brother in a coma, a graduate student (Anne Hathaway) travels to New York to see him and subsequently becomes involved with the musician (Johnny Flynn) her brother idolized",
  director: 'Kate Barker Froyland',
  Birth: "1963",
  Bio: "Kate Barker-Froyland is a writer and director whose films have played at numerous film festivals",
  genre: 'Romance',
  Description: 'Most often, romance as a film genre is understood to be love stories, emotion-driven stories that are primarily focused on the relationship between the main characters of the story.',
  Imagepath: "https://m.media-amazon.com/images/I/71EEqLXvp1L._SY679_.jpg", "Featured": false
}, {
  title: 'War of the Worlds',
  Description: "A divorced dockworker is forced to become the protective father he has never been when spaceships invade Earth and the danger mounts",
  director: 'Steven Spielberg',
  Birth: "1946",
  Bio: "Steven Allan Spielberg is an American film director, producer, and screenwriter. He began his career in the New Hollywood era, and is currently the most commercially successful director",
  genre: 'Action',
  Description: "An action story is similar to adventure and the protagonist usually takes a risky turn, which leads to desperate situations such as explosions, fight scenes and daring escapes",
  Imagepath: "https://flxt.tmsimg.com/assets/p36056_p_v13_al.jpg", "Featured": false
  
}, {
  title: 'The Hateful Eight',
  Description: "In post Civil War Wyoming, bounty hunters try to find shelter during a blizzard but get involved in a plot of betrayal and deception.",
  director: 'Quentin Jerome Tarantino',
  Birth: "1963",
  Bio: "Quentin Jerome Tarantino is an American film director, screenwriter, producer, author, film critic, and actor.",
  genre: 'Action',
  Description: "An action story is similar to adventure and the protagonist usually takes a risky turn, which leads to desperate situations such as explosions, fight scenes and daring escapes",
  ImagePath: "https://m.media-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_QL75_UX100_CR0,0,100,148_.jpg"
}, {
  title: 'Something Evil',
  Description: "A horror tale about a young couple moving into a Bucks County, Pennsylvania farmhouse, unaware that it is occupied by an unseen presence",
  director: 'Steven Spielberg',
  Birth: "1946",
  Bio: "teven Allan Spielberg is an American film director, producer, and screenwriter. He began his career in the New Hollywood era, and is currently the most commercially successful director",
  genre: 'Horror',
  Description: "Horror is a genre of film in which a story is told to deliberately scare or frighten the audience, through suspense, violence or shock",
  Imagepath: "https://m.media-amazon.com/images/M/MV5BNDc5NGMxM2QtNzBjZS00OGViLWExMzQtODNhMGNiYzlkZDk0XkEyXkFqcGdeQXVyNjQxODA2ODA@._V1_.jpg", "Featured": false

}, {
  title: 'Trainwreck',
  Description: "A young magazine writer is made to believe that relationships and marriages hold no value. However, a chance meeting with a sports doctor forces her to rethink her principles.",
  director: 'Judd Apatow',
  Birth: "1967",
  Bio: "Judd Apatow is an American producer, writer, director, actor and stand-up comedian",
  genre: 'Comedy',
  Description: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect",
  Imagepath: "https://upload.wikimedia.org/wikipedia/en/c/c5/Trainwreck_poster.jpg", "Featured": true
},
{
  title: 'Knocked Up',
  Description: "A one-night stand results in an unexpected pregnancy for Alison, who tries to make things work with the slacker who knocked her up",
  director: 'Judd Apatow',
  Birth: "1967",
  Bio: "Judd Apatow is an American producer, writer, director, actor and stand-up comedian",
  genre: 'Comedy',
  Description: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect",
  Imagepath: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/69ce40cd343c922c4b9605038465de1d7f9c22adb4007a84396e7e2e8c330d66._RI_V_TTW_.jpg", "Featured": false

  },
];

db.users.update(
  { _id: ObjectId("615f16dbd003be4de2699e52") },
  { $set: { "FavoriteMovies": ObjectId("615f48d3547f63adb2089d89")}})

user2 = {
Username: 'Blaise Okay',
Password: 'fffff_4',
Email: 'aaaaa@hotline.com',
birth_date: "1948-02-19",
FavoriteMovies: [ObjectId("615ddb15d003be4de2699e4a"), ObjectId("615ddaedd003be4de2699e49")]
}
  
User1 = {
  Username: "Daniel Oke",
  Password: "mmmmm_6",
  Email: "XXXXX@yahoo.com",
  Birthday: "1984-02-19",
  FavoriteMovies: ObjectId[("615f47df547f63adb2089d88"), ("615f48d3547f63adb2089d89")]  
},
  

  user2 = {
    Username: "Blaise Okay",
    Password: "fffff_4",
    Email: "aaaaa@hotline.com",
    birth_date: "1948-02-19",
    FavoriteMovies: ObjectId[("615f4960547f63adb2089d8a"), ObjectId("615f49ac547f63adb2089d8b")]

},

  User3 = {
    Username: "User 3",
    Password: "zzzzz_6",
    Email: "sss@gmail.com",
    Birthday: "1962-02-19",
    FavoriteMovies: ObjectId[("615f4a65547f63adb2089d8c"), ObjectId("615f4ecd547f63adb2089d8d"), ObjectId("615f4f62547f63adb2089d8e")]        
} ,


user4 = {
    Username: "User 4",
    Password: "qqqqq_5",
    Email: "bbb@yahoo.com",
    Birthday: "1955-02-19",
    FavoriteMovies: ObjectId[("615f5123547f63adb2089d8f"), ObjectId("615f520f547f63adb2089d90")]

} ,

user5 = {
    Username: "User 5",
    Password: "yyyyy_5",
    Email: "ccccc@yahoo.com",
    birth_date: "1992-02-19",
  FavoriteMovies: ObjectId[("615f5480547f63adb2089d91"), ObjectId("615f5123547f63adb2089d8f")]
}


  directors = [{
    name: 'Judd Apatow',
    Birth: "1967",
  }, {
    name: 'Jonathan Demme',
  Birth: 1944,
  }, {
    name: 'Steven Spielberg',
    Birth: "1946",
    
  }, {
    name: 'Kate Barker Froyland',
    Birth: "1963",
  }, {
    name: 'Quentin Jerome Tarantino',
    Birth:"1963"
  }, {
    name: 'Nick Cassavetes',
    Birth: '1959',
  }, {
    name: 'Peter Hans Docter',
    birthYear: '1968'
  }, ];


// Get all movies
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Update a user's info, by username

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Add a user

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// GET requests for a specific movie by title
  app.get('/movies/:Title', (req, res) => {
    Movies.findOne({Title: req.params.Title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ', err);
    });
  });

  //Get a list of all genres
  app.get('/genre', (req, res) => {
      Genre.find()
        .then(genre => {
          res.status(201).json(genre);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
        });
    });

  //get a specific genre by name
  app.get('/genre/:Name', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name})
    .then((genre) => {
      res.json(genre.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

  //get list of all directors
  app.get('/directors', (req, res) => {
    Movies.find()
      .then((director) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  //get director info by name
  app.get('/director/:Name', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name})
    .then((director) => {
      res.json(director.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

// Delete a user by their username
  app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
      if(!user) {
        res.status(400).send(req.params.Username + ' was not found.');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

  // Delete a movie from the favorite list of an user
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username}, {
    $pull: {FavoriteMovies: req.params.MovieID}
  },
  {new: true},
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});
// Error-handling middleware function
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});
app.listen(8080, () => {
	console.log('movie_api is listening on port 8080.');
});

  