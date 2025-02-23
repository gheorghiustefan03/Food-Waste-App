const { userTable } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
    const noRounds = 10;
    const salt = await bcrypt.genSalt(noRounds);
    const newPass = await bcrypt.hash(password, salt);

    return newPass;
}

const maxAge = 3 * 60 * 60; //in seconds
const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: maxAge });
}

const userController = {
    createUser: async (req, res) => {
        try {
            const { firstName, lastName, email, password} = req.body;

            const payload = {
                firstName,
                lastName,
                email,
                password
            };

            payload.password = await hashPassword(payload.password);
            const createdUser = await userTable.create(payload);
            const token = genToken(createdUser.id);
            const secure = process.env.RUN_MODE === 'LOCAL' ? false : true
            const sameSite = process.env.RUN_MODE === 'LOCAL' ? 'Strict' : 'None';
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, secure: secure, sameSite: sameSite });
            res.status(200).json(createdUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await userTable.findAll();
            if (users.length === 0) {
                res.status(400).json({ message: 'No users in database' });
            }
            else {
                res.status(200).json(users);
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await userTable.findByPk(req.params.id);
            if (!user) {
                res.status(404).json({ message: `No user with id ${req.params.id} in database` });
            }
            else {
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = await userTable.findByPk(req.params.id);
            if (!user) {
                res.status(404).json({ message: `No user with id ${req.params.id} in database` });
                return;
            }
            const { firstName, lastName, email, password} = req.body;
            const payload = {
                firstName,
                lastName,
                email,
                password
            };
            user.update(payload);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await userTable.findByPk(req.params.id);
            if (!user) {
                res.status(404).json({ message: `User with id ${req.params.id} not in database` });
                return;
            }
            user.destroy();

            res.status(200).json({ message: `User with id ${req.params.id} deleted` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await userTable.findOne({ where: { email: req.body.email } });
            if (user == null) {
                res.status(404).json({ message: `No user with email ${req.body.email} in database` });
                return;
            }
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result == true) {
                const token = genToken(user.id);
                const secure = process.env.RUN_MODE === 'LOCAL' ? false : true
                const sameSite = process.env.RUN_MODE === 'LOCAL' ? 'Strict' : 'None';
                res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true, secure: secure, sameSite: sameSite });
                console.log(secure);
                res.status(200).json({ message: 'Successfully logged in' });
                return;
            }
            else
                res.status(400).json({ message: 'Incorrect password' });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },
    getLoggedInUser: async (req, res) => {
        try {
            const token = req.cookies.jwt;
            if (token) {
                jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
                    if (err) {
                        res.status(400).json({ message: `Invalid JWT: ${err.message}` });
                    }
                    else {
                        const user = await userTable.findByPk(decodedToken.id);
                        console.log(user);
                        res.status(200).json({ user: user });
                    }
                })
            }
            else {
                res.status(400).json({ message: 'No user logged in.' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }

    },
    logout: async (req, res) => {
        try {
            const secure = process.env.RUN_MODE === 'LOCAL' ? false : true
            const sameSite = process.env.RUN_MODE === 'LOCAL' ? 'Strict' : 'None';
            res.cookie('jwt', '', { maxAge: 1 , httpOnly: true, secure: secure, sameSite: sameSite});
            res.status(200).json({ message: 'Sucessfully logged out' });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = userController;