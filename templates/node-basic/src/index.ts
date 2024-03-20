import { testFunction } from './helpers.js';

const run = async () => {
  const todo = await testFunction();
  console.log('Todo #1: ', todo);
};

run();


Array(0, 1, 2);
new Array(0, 1, 2);