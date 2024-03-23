import axios from 'axios';

type Tes = {
  data: { lala: string };
};

export const testFunction = async () => {
  // const { data }: Tes = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  // return data;
  const res = (await axios.get('https://jsonplaceholder.typicode.com/todos/1')) as Tes;
  return res.data;
};
