import dotenv from 'dotenv';
import path from 'path';
import {isDevServer} from './util';

const {NODE_ENV} = process.env;

const {parsed} = dotenv.config({
  path: path.join(__dirname, isDevServer() ? '../..' : '.', `.env`)
});

export default {
  NODE_ENV,
  ...parsed
};
