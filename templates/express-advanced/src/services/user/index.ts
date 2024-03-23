import axios, { AxiosResponse } from 'axios';
import { Post } from 'src/types';

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
