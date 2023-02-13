import mongoose from 'mongoose';
import { serverConfig } from './server.config.js';
import { logger } from '../utils/winston.util.js';

const uri = serverConfig.MONGO_ATLAS;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.set('strictQuery', true);
export const mongoConnect = mongoose.connect(uri, options);