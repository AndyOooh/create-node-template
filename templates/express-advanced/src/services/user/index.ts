import axios from 'axios';

export const fetchUsers = async () => {
  try {
    const posts = await axios.get('https://jsonplaceholder.typicode.com/users');
    /* Any other business logic, e.g. publish events, etc. */
    return posts.data;
  } catch (error) {
    console.log('🚀  error:', error);
    throw error;
  }
};
