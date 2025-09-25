const mongoose = require('mongoose');
const Problem = require('./models/Problem');
require('dotenv').config(); // if using .env
mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Problem.insertMany([
    {
      title: "Reverse a String",
      description: "Write a function that reverses a string.",
      difficulty: "easy",
      tags: ["string", "basic"],
      solution: "function reverse(str) { return str.split('').reverse().join(''); }"
    },
    {
      title: "First Non-Repeating Character",
      description: "Find the first character that does not repeat.",
      difficulty: "medium",
      tags: ["string", "hashmap"],
      solution: "function firstUniqueChar(str) { /* logic */ }"
    },
    {
      title: "Implement Trie",
      description: "Build a Trie with insert and search methods.",
      difficulty: "hard",
      tags: ["tree", "advanced"],
      solution: "class Trie { /* logic */ }"
    }
  ]);
  console.log("Problems seeded");
  mongoose.disconnect();
});