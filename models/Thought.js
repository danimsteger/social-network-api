const { Schema, model } = require('mongoose');

// Import reactionSchema to use in Thought model
const reactionSchema = require('./Reaction');

// Import formatDate function to properly format createdAt dates
const { formatDate } = require('../utils/helpers');

// Thought Model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1],
      maxLength: [280, 'Thoughts cannot exceed 280 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter to formatDate function
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    // Include reaction schema in Thought model
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual to calculate the total number or reactions for each thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize Thought model (Store it in the collection)
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
