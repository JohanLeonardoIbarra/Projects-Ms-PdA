import dotenv from 'dotenv';
dotenv.config({ path: '../' });

const env = process.env.ENV;
interface ConfigI {
  db_uri: string;
  port: number;
  secretKey: string;
}

let config: ConfigI = {
  db_uri: 'mongodb://mongo-user:mongo-pass@mongo_projects:27018/',
  port: 8082,
  secretKey: 'nonSecretKey',
};

if (env === 'prod')
  config = {
    db_uri: process.env.DB_URI || '',
    port: Number(process.env.PORT),
    secretKey: process.env.SECRET_KEY || '',
  };

export default config;
