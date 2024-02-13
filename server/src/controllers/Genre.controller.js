const Genre = require('../models/Genre.model');
exports.getAllGenres = async (req, res, next) => {
    await Genre.findAll()
    .then(genres => {
        res.status(200).json({
            genresCount: genres.length,
            genres: genres,
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.getGenre = async (req, res, next) => {
    await Genre.findByPk(req.params.GenreName)
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Genre fetched successfuly',
                Genre: result
            });
        } else {
            res.status(404).json({
                message: 'no Genre found',
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

exports.postGenre = async (req, res, next) => {
    console.log(req.body.name);
    await Genre.create({
        name: req.body.name
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Genre was created successfully',
            Genre: result
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.updateGenre = async (req, res, next) => {
    await Genre.update({ name: req.body.name }, { where: { name: req.params.GenreName } })
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Genre updated successfully',
                Genre: result
            });
        } else {
            res.status(404).json({
                message: 'Genre not found'
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

exports.deleteGenre = async (req, res, next) => {
    await Genre.destroy({ where: { name: req.params.GenreName } })
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Genre deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'no Genre found'
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
