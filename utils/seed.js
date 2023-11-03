const connection = require('../config/connection');
const { Thought, User } = require('../models');
const {
    getRandomName,
    getRandomThought,
    getRandomReaction,
    genRandomIndex,
  } = require('./data');

// Start the seeding runtime timer
console.time('seeding');


connection.once('open', async () => {
    let thoughtCheck = await connection.db.listCollections({name: 'thoughts'}).toArray();
    if (thoughtCheck.length){
        await connection.dropCollection('thoughts');
    }
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

//Empty array for randomly generated Thoughts
const reactions = [...getRandomReaction(20)]
const thoughts = [];
const users = [];

const makeUsers = function () {
    for (let i=0; i< 20; i++){
        const username = getRandomName();
        const email = `${getRandomName()}@gmail.com`

        users.push({
            username,
            email,
            thoughts: [thoughts[genRandomIndex(thoughts)]._id]
        });
    };
};

const makeThought = (text) => {
    thoughts.push({
        thoughtText: text,
        username: getRandomName().split(' ')[0],
        reactions: [reactions[genRandomIndex(reactions)]._id],
    });
};

//Wait for reactions to be inserted into the database.
await Thought.collection.insertMany(reactions);

//for each reaction that exists, make a random post of 2 words
reactions.forEach(() => makeThought(getRandomThought(2)));

// Wait for the posts array to be inserted into the database
await Thought.collection.insertMany(thoughts);

//for each thought that exists, make a random user
makeUsers();

//Wait for the users array to be inserted into the database
await User.collection.insertMany(users);

    // Log out a pretty table for comments and posts
    console.table(reactions);
    console.table(thoughts);
    console.table(users);
    console.timeEnd('seeding complete 🌱');
    process.exit(0);
});