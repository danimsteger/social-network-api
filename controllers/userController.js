const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a user
  async createUser(req, res) {
    try {
      const user = User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get one user
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean()
        // include the associate 'thoughts' and 'friends' information of that user (not just the id's)
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        // Find user by id in route path
        { _id: req.params.userId },
        // Update to new body
        { $set: req.body },
        // Run validators to ensure that new information is valid for a user and update database with new information
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      // Find user by id in route path and delete
      const user = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID!' });
      }

      // Get deleted user's username
      const deletedUsername = user.username;

      // Delete any thoughts that have the deleted user's username
      const deletedThoughts = await Thought.deleteMany({
        username: deletedUsername,
      });

      res.json({ message: 'User successfully deleted', deletedThoughts });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Add a friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        // Find a user by id in route path
        { _id: req.params.userId },
        // Add friend by id specified in route path
        { $addToSet: { friends: req.params.friendId } },
        // Update database with new information
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        // Find user by id in route path
        { _id: req.params.userId },
        // Remove friend from friend list by id in route path
        { $pull: { friends: req.params.friendId } },
        // Update database iwth new info
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
