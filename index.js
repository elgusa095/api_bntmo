/**
 * * IMPORTS
 */
import express from 'express';
import verifications from './middlewares/verifications.js';
import bot from './config/botConfig.js';
import { CHAT_ID } from './config/preconfigs.js';
import { db } from './config/db.js';
import router from './routes/index.js';

import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });


/**
 * * EXPRESS CONFIGURATION
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(verifications);
app.use(router);

// -- Trying DB connection
try {
  db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));
} catch (error) {
  console.error("Database didn't connect: ", error);
}


/** RESTART MESSAJE */
bot.sendMessage(CHAT_ID, `
  \u{1F340} REINICIO COMPLETO \u{1F340}\n
`);


/**
 * SERVER ON
 */
const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'

app.listen(port, () => {
  console.log('Server running in ' + host);
  console.log('CREDENTIALS:')
  console.log(port)
  console.log(host)
});