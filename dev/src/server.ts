import { config } from 'dotenv';
config();

import * as http from 'http';
import * as mongoose from 'mongoose';
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
  const appClass = require('./app').default;
  await mongoose.connect(MONGO_URI);

  const server = http.createServer(appClass.app);
  server.once('listening', () => {
    console.log(`Server started at PORT ${PORT}`);
  });

  server.listen(PORT);
};

start();
