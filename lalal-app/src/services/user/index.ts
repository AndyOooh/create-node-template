import { Post } from '@_types/index.js';
import axios, { AxiosResponse } from 'axios';

export const fetchUsers = async () => {
  try {
    const { data }: AxiosResponse<Post[]> = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
      // 'https://jsonplaceholder.typicode.com/usersalallala' will fail
    );

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw { ...error, shouldLog: true };
    }
  }
};
