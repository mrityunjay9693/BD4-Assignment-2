const express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;
const path = require('path');

(async () => {
  db = await open({
    filename: path.join(__dirname, '../bd4_assignment2_database.sqlite'),
    driver: sqlite3.Database,
  });
})();

console.log(
  'Database path:',
  path.resolve('./bd4_assignment2_database.sqlite')
);

/**
 * Exercise 1: Get All Games
 * Objective: Fetch all games from the database.
 * Query Parameters: None
 * Tasks: Implement a function to fetch all games.
 * Example Call: http://localhost:3000/games
 */
//function to fetch all games.
async function fetchAllGames() {
  let query = 'SELECT * FROM games';
  let response = await db.all(query, []);
  return { games: response };
}

//Endpoint
app.get('/games', async (req, res) => {
  try {
    let results = await fetchAllGames();
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No Games Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Get Game by ID
 * Objective: Fetch a specific game by its ID.
 * Query Parameters: id (integer)
 * Tasks: Implement a function to fetch a game by its ID.
 * Example Call: http://localhost:3000/games/details/1
 */
//function to fetch game by id
async function fetchGamesById(id) {
  let query = 'SELECT * FROM games WHERE id = ?';
  let response = await db.all(query, [id]);
  return { games: response };
}

//Endpoint
app.get('/games/details/:id', async (req, res) => {
  let id = req.params.id;

  try {
    let results = await fetchGamesById(id);
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No Games Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Get Games by Genre
 * Objective: Fetch games based on their genre.
 * Query Parameters: genre (string)
 * Tasks: Implement a function to fetch games by genre.
 * Example Call: http://localhost:3000/games/genre/FPS
 */
//function to fetch games by genre
async function fetchGamesByGenre(genre) {
  let query = 'SELECT * FROM games WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { games: response };
}

//Endpoint
app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;

  try {
    let results = await fetchGamesByGenre(genre);
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No Games Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Get Games by Platform
 * Objective: Fetch games based on their platform.
 * Query Parameters:
 * platform (string)
 * Tasks: Implement a function to fetch games by platform.
 * Example Call: http://localhost:3000/games/platform/PC
 */
//function to fetch games by platform
async function fetchGamesByPlatform(platform) {
  let query = 'SELECT * FROM games WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { games: response };
}

//Endpoint
app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchGamesByPlatform(platform);
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No Games Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.statsu(500).json({ error: error.message });
  }
});

/**
 * Exercise 5: Get Games Sorted by Rating
 * Objective: Fetch games sorted by their rating ( highest to lowest )
 * Query Parameters: None
 * Tasks: Implement a function to fetch games sorted by rating.
 * Example Call: http://localhost:3000/games/sort-by-rating
 */
//function to games sorted by rating
async function fetchGamesBySortedRating() {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { games: response };
}

//Endpoint
app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let results = await fetchGamesBySortedRating();
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No Games Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 6: Get All Players
 * Objective: Fetch all players from the database.
 * Query Parameters: None
 * Tasks: Implement a function to fetch all players.
 * Example Call: http://localhost:3000/players
 */
//function to get all players
async function fetchAllPlayers() {
  let query = 'SELECT  * FROM players';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players', async (req, res) => {
  try {
    let results = await fetchAllPlayers();
    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No Players Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 7: Get Player by ID
 * Objective: Fetch a specific player by their ID.
 * Query Parameters: id (integer)
 * Tasks: Implement a function to fetch a player by their ID.
 * Example Call: http://localhost:3000/players/details/1
 */
//function to fetch players by id.
async function fetchPlayersById(id) {
  let query = 'SELECT * FROM players WHERE id = ?';
  let response = await db.all(query, [id]);
  return { players: response };
}

//Endpoint
app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;

  try {
    let results = await fetchPlayersById(id);
    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No Players Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 8: Get Players by Platform
 * Objective: Fetch players based on their platform.
 * Query Parameters: platform (string)
 * Tasks: Implement a function to fetch players by platform.
 * Example Call: http://localhost:3000/players/platform/PC
 */
//function to fetch players by platform
async function fetchPlayersByPlatform(platform) {
  let query = 'SELECT * FROM players WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { players: response };
}
//Endpoint
app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchPlayersByPlatform(platform);
    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No Players Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 9: Get Players Sorted by Rating
 * Objective: Fetch players sorted by their rating ( highest to lowest ).
 * Query Parameters: None
 * Tasks: Implement a function to fetch players sorted by rating.
 * Example Call: http://localhost:3000/players/sort-by-rating
 */

//function to sort players by rating
async function fetchPlayersBySortedRating() {
  let query = 'SELECT * FROM players ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { players: response };
}

//Endpoint
app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let results = await fetchPlayersBySortedRating();
    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No Players.Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 10: Get All Tournaments
 * Objective: Fetch all tournaments from the database.
 * Query Parameters: None
 * Tasks: Implement a function to fetch all tournaments.
 * Example Call: http://localhost:3000/tournaments
 */
//function to fetch all tournaments
async function fetchAllTournaments() {
  let query = 'SELECT * FROM tournaments';
  let response = await db.all(query, []);
  return { tournaments: response };
}

//Endpoint
app.get('/tournaments', async (req, res) => {
  try {
    let results = await fetchAllTournaments();
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: 'No Tournaments Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 11: Get Tournament by ID
 * Objective: Fetch a specific tournament by its ID.
 * Query Parameters: id (integer)
 * Tasks: Implement a function to fetch a tournament by its ID.
 * Example Call: http://localhost:3000/tournaments/details/1
 */
//function to fetch tournaments by id
async function fetchAllTournamentsById(id) {
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

//Endpoint
app.get('/tournaments/details/:id', async (req, res) => {
  let id = req.params.id;

  try {
    let results = await fetchAllTournamentsById(id);
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: 'No Tournaments Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 12: Get Tournaments by Game ID
 * Objective: Fetch tournaments based on their game ID.
 * Query Parameters: id (integer)
 * Tasks: Implement a function to fetch tournaments by game ID.
 * Example Call: http://localhost:3000/tournaments/game/1
 */
//function to fetch tournaments by gameID
async function fetchTournamentsByGameId(gameId) {
  let query = 'SELECT * FROM tournaments WHERE gameId = ?';
  let response = await db.all(query, [gameId]);
  return { tournaments: response };
}

//Endpoint
app.get('/tournaments/game/:gameId', async (req, res) => {
  let gameId = req.params.gameId;
  try {
    let results = await fetchTournamentsByGameId(gameId);
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: 'No Tournaments Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 13: Get Tournaments Sorted by Prize Pool
 * Objective: Fetch tournaments sorted by their prize pool ( highest to lowest ).
 * Query Parameters: None
 * Tasks: Implement a function to fetch tournaments sorted by prize pool.
 * Example Call: http://localhost:3000/tournaments/sort-by-prize-pool
 */

//functiont get tournaments sorted by prize pool
async function fetchAllTournamentsBySortedPrizePool() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  let response = await db.all(query, []);
  return { tournaments: response };
}

//Endpoint
app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let results = await fetchAllTournamentsBySortedPrizePool();
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: 'No Tournaments Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// app.use(express.static('static'));

app.get('/', (req, res) => {
  return res.status(200).json('WELCOME');
});

//module.exports = app;

app.listen(PORT, () => {
  console.log('Server running at port 3000');
});
