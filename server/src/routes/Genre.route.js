const express = require('express');
const router = express.Router();
const genreController = require('../controllers/Genre.controller');

// get all genres
router.get('/', genreController.getAllGenres);

// get speciific genre
router.get('/:GenreName', genreController.getGenre);

// post new genre
router.post('/', genreController.postGenre);

// update existing genre
router.patch('/:GenreName', genreController.updateGenre);

// delete specific genre
router.delete('/:GenreName', genreController.deleteGenre);

module.exports = router;