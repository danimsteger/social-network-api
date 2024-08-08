const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
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

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

function formatDate(createdAt) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = createdAt.getDate();
  const month = months[createdAt.getMonth()];
  const year = createdAt.getFullYear();
  const time = createdAt.toLocaleTimeString();

  return month + ' ' + day + ', ' + year + ' at ' + time;
}

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
