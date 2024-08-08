const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      return res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // Adds the new thought to a user
      const user = await User.findOneAndUpdate(
        // Gets userid specified in the POST body
        { _id: req.body.userId },
        // Push thought by thought _id
        { $push: { thoughts: thought._id } },
        // Update the existing user
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created but no user found with that ID' });
      }

      return res.json('Thought created!!');
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get One Thought
  async getOneThought(req, res) {
    try {
      // Find thought by id found in the route path
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID!!' });
      }
      return res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update an existing thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        // Find thought by id found in route path
        { _id: req.params.thoughtId },
        // Set new information found in PUT body
        { $set: req.body },
        // Run validators to ensure that new information is valid for a thought and update database with new information
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID!!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      // Find thought by id found in route path and delete
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID!!' });
      }

      //  Update user of the thought, too
      const user = await User.findOneAndUpdate(
        // Find user with that thoughtId
        { thoughts: req.params.thoughtId },
        // Remove that thoughtId from user
        { $pull: { thoughts: req.params.thoughtId } },
        // Return updated user info in database
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought deleted but no user found with that ID' });
      }

      res.json({ message: 'Thought successfully deleted!!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async createThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        // Find thought by id specified in route path
        { _id: req.params.thoughtId },
        // Add reaction to thought
        { $addToSet: { reactions: req.body } },
        // Run validators to ensure that new information is valid for a thought and update database with new information
        { runValidator: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID!!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete thought reaction
  async deleteThoughtReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        // Find thought by id specified in route path
        { _id: req.params.thoughtId },
        // Remove reaction by finding id specified in route path
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        // Update thought in DB
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID!!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
