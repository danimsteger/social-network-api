const { Schema, model } = require('mongoose');

// User Model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Validator to ensure that emails for a user follow the correct pattern for an email.
      validate: {
        validator: function (check) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(check);
        },
        message: (invalid) => `${invalid.value} is not a valid email!`,
      },
    },
    // Referencing exisitng Thought model by id
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    // Referencing itself (User model) by id
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Creates virtual 'friendCount' to get the amount of friends in a users friend list
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initializes User model
const User = model('user', userSchema);

module.exports = User;
