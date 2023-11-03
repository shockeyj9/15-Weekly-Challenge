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
// Need to generate random thoughtText, username, reaction ids.
//Empty array for randomly generated Thoughts
const reactions = [...getRandomReaction(4)]
const thoughts = [];

const makeThought = (text) => {
    thoughts.push({
        thoughtText: text,
        username: getRandomName().split(' ')[0],
        reactions: [reactions[genRandomIndex(reactions)]._id],
    });
};

//Wait for thoughts to be inserted into the database.
await Thought.collection.insertMany(reactions);

//for each reaction that exists, make a random post of 2 words
reactions.forEach(() => makeThought(getRandomThought(10)));

  // Wait for the posts array to be inserted into the database
  await Thought.collection.insertMany(thoughts);

    // Log out a pretty table for comments and posts
    console.table(reactions);
    console.table(thoughts);
    console.timeEnd('seeding complete 🌱');
    process.exit(0);
});