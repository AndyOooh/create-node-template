import axios, { AxiosResponse } from 'axios';
import { Post } from 'src/types';

export const fetchUsers = async () => {
  try {
    const { data }: AxiosResponse<Post[]> = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    return data;
  } catch (error) {
    console.log('🚀  error:', error);
    throw error;
  }
};
