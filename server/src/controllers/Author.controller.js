const Author = require('../models/Author.model');
exports.getAllAuthors = async (req, res, next) => {
    await Author.findAll()
    .then(Authors => {
        res.status(200).json({
            AuthorsCount: Authors.length,
            Authors: Authors
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.getAuthor = async (req, res, next) => {
    await Author.findByPk(req.params.AuthorId)
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Author fetched successfuly',
                Author: result
            });
        } else {
            res.status(404).json({
                message: 'no Author found',
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.postAuthor = async (req, res, next) => {
    await Author.create({
        lastName: req.body.lastName,
        firstName: req.body.firstName
    })
    .then(result => {
        res.status(201).json({
            message: 'Author was created successfully',
            Author: result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.updateAuthor = async (req, res, next) => {
    const valuesToChange = {};
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    for (let i = 0; i < keys.length; i++) {
        valuesToChange[keys[i]] = values[i];
    }

    await Author.update(valuesToChange, { where: { id: req.params.AuthorId }})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Author updated successfully',
                numberOfAtrributedAffected: result,
                valuesChanged: valuesToChange
            });
        } else {
            res.status(404).json({
                message: 'Author not found'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.deleteAuthor = async (req, res, next) => {
    await Author.destroy({ where: { id: req.params.AuthorId }})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Author deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'no Author found'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};