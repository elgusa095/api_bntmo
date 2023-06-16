/**
 * * IMPORTS
 */
import express from 'express';
import verifications from './middlewares/verifications.js';
import bot from './config/botConfig.js';
import { CHAT_ID, PORT} from './config/preconfigs.js';
import router from './routes/index.js';


/**
 * * EXPRESS CONFIGURATION
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(verifications);
app.use(router);

/** RESTART MESSAJE */
bot.sendMessage(CHAT_ID, 'REINICIO COMPLETO');

/**
 * SERVER ON
 */
const port = PORT || 8080;
const host = '0.0.0.0';

app.listen(port, () => {
  console.log('Server running in ' + host);
  console.log('CREDENTIALS:')
  console.log(port)
  console.log(host)
});