import axios, { AxiosResponse } from 'axios';
import { Post } from 'src/types';

export const fetchUsers = async () => {
  try {
    const { data }: AxiosResponse<Post[]> = await axios.get(
      // 'https://jsonplaceholder.typicode.com/users'
      'https://jsonplaceholder.typicode.com/usersalallala'
    );
    return undefined;
    return data;
  } catch (error: unknown) {
    console.log('🚀  error:', error);
    if (error instanceof Error) {
      throw { ...error, shouldLog: true };
    }
  }
};
