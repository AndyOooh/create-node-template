import 'dotenv/config';

const { PORT } = process.env;

export const configVars = {
  port: PORT || 8080,
};
