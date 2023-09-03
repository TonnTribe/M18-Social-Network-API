const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get one user by id
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            // remove user's associated thoughts
            await Thought.deleteMany({ username: user.username });
            res.json({ message: 'User and associated thoughts deleted!' });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true, runValidators: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json({message: 'Friend added!' });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // remove friend
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true, runValidators: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json({message: 'Friend removed!' });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};
