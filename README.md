# Social Network API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This project involved creating an API for a social network application using Express.js, MongoDB, and Mongoose.

A walkthrought video that demonstrates the route functionality of the API using Insomnia can be found [here](https://drive.google.com/file/d/1JrEwE8W3Cqy0tTLDQYxxx8KQLAUFy3eI/view?usp=sharing).

---

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

---

---

## Installation

### Clone this repository

```
git clone git@github.com:danimsteger/social-network-api.git
```

### Go into this repository

```
cd social-network-api
```

### Access code of the repository

```
code .
```

### Install Necessary Dependencies on local device

```
npm install
```

---

---

## Usage

To view a video walkthrough of this application, click [here](https://drive.google.com/file/d/1JrEwE8W3Cqy0tTLDQYxxx8KQLAUFy3eI/view?usp=sharing).

To view the program, navigate to the cloned repository.

### Start Application:

```
npm start
```

Once the application has been started, users can test different routes to view, create, update, and delete data.

Users are able to use the following routes:

- GET: View All User - localhost:3001/api/users
- GET: View One User - localhost:3001/api/users/:userId
- POST: Create A User - localhost:3001/api/users
  ![sample create user body](/assets/images/createuser.png)
- PUT: Update A User - localhost:3001/api/users/:userId
  ![sample update user](/assets/images/updateuser.png)
- DELETE: Remove A User - localhost:3001/api/users/:userId
  ![Sample response from removing user](/assets/images/deleteuser.png). - when deleting a user, it will also delete the users corresponding thoughts, too.

- POST: Add A Friend - localhost:3001/api/users/:userId/friends/:friendId
- DELETE: Remove A Friend - localhost:3001/api/users/:userId/friends/:friendId

- GET: View All Thoughts - localhost:3001/api/thoughts
- GET: View One Thought - localhost:3001/api/thoughts/:thoughtId
- POST: Create A Thought - localhost:3001/api/thoughts
  ![sample create thought body](/assets/images/newthought.png)
- PUT: Update A Thought - localhost:3001/api/thoughts/:thoughtId
  ![sample update thought](/assets/images/updatethought.png)
- DELETE: Remove A Thought - localhost:3001/api/thoughts/:thoughtId

- POST: Add A Thought Reaction - localhost:3001/api/thoughts/:thoughtId/reactions
  ![sample add reaction body](/assets/images/thoughtreaction.png)
- DELETE: Remove A Thought Reaction - localhost:3001/api/thoughts/:thoughtId/reactions/reactionId

## Credits

This project was created entirely by Danielle Steger. To complete this project, several articles on "MDN Web Docs" and "W3Schools" were referenced. Several specific articles are linked below. Additionally, materials by edX Boot Camps LLC were referenced, adopted, and modified. This project was comleted with the use of Express.js, MongoDB, Mongoose and their corresponding documentation was referenced as well.

- To validation an email in mongoose: https://mongoosejs.com/docs/validation.html

- To format date with JavaScript: https://www.w3schools.com/jsref/jsref_obj_date.asp

- To format date using a 'getter' in Mongoose: https://mongoosejs.com/docs/tutorials/getters-setters.html

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
