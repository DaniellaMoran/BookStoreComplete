const express = require('express');
const router = express.Router();
const authorController = require('../controllers/Author.controller');;

// get all Authors
router.get('/', authorController.getAllAuthors);

// get speciific Author
router.get('/:AuthorId', authorController.getAuthor);

// post new Author
router.post('/', authorController.postAuthor);

// update existing Author
router.patch('/:AuthorId', authorController.updateAuthor);

// delete specific Author
router.delete('/:AuthorId', authorController.deleteAuthor);

module.exports = router;