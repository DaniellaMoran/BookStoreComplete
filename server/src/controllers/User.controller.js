const { Sequelize, Op } = require('sequelize');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function isPasswordOkay(password){
    // var minLength = 6;
    // var maxLength = 13;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
    return passwordRegex.test(password);
}

exports.signup = async (req, res, next) => {
    // find if user exists
    await User.findAll({
        where: {
            [Op.or]: [
                { mail: req.body.mail },
                { userName: req.body.userName }
            ]
        }
    })
    .then(result => {
        if (result.length > 0) {
            res.status(409).json({
                message: 'username/email already exists'
            });
        } else {
            // email/username dont exist
            // if (req.body.password !== undefined) {
            //     throw new Error('no Password provided');
            // }
            if (isPasswordOkay(req.body.password)) {
                bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error:err,
                            msg:"hash failed ig"
                        });
                    } else {
                        await User.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            mail: req.body.mail,
                            userName: req.body.userName,
                            password: hash
                        })
                        .then(result => {
                            res.status(201).json({
                                message: 'User signed up successfully',
                                user: result
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                found: "you mf",
                                message: err.message,
                                error: err
                            });
                        });
                    }
                })
            } else {
                res.status(500).json({
                    message: " controller Password must contain 1 uppercase, 1 lowercase and one digit, length 8-16",
                });
            }
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            msg:"error processing request to find user with same username",
            error: err
        });
    });
};

exports.login = async (req, res, next) => {
    const loginIdentifier = req.body.userName || req.body.mail;
    await User.findAll({
        where: {
            [Op.or]: [
                { mail: loginIdentifier },
                { userName: loginIdentifier }
            ]
        }
    })
    .then(users => {
        if (users.length > 0) {
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: users[0].mail,
                        userId: users[0].id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message: "Auth succeeded",
                        user: users[0],
                        token: token
                    });
                }

                res.status(401).json({
                    message: "Auth Failed"
                });
            })
        } else {
            res.status(401).json({
                message: 'Auth failed'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            msg:"error processing request to find user by username or mail",
            error: err
        });
    });
};

exports.getAllUsers = async (req, res, next) => {
    await User.findAll()
    .then(users => {
        res.status(200).json({
            usersCount: users.length,
            users: users
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.getUser = async (req, res, next) => {
    await User.findByPk(req.params.UserId)
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'User fetched successfuly',
                user: result
            });
        } else {
            res.status(404).json({
                message: 'no user found'
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

exports.updateUser = async (req, res, next) => {
    const valuesToChange = {};
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    for (let i = 0; i < keys.length; i++) {
        valuesToChange[keys[i]] = values[i];
    }

    await User.update(valuesToChange, { where: { id: req.params.UserId } })
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'User updated successfully',
                user: result
            });
        } else {
            res.status(404).json({
                message: 'User not found'
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

exports.deleteUser = async (req, res, next) => {
    await User.destroy({ where: { id: req.params.UserId }})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'User deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'no user found'
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