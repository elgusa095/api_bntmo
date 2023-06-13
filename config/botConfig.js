/**
 * CHATBOT CONFIG
 */
import TelegramBot from 'node-telegram-bot-api';
import {TOKEN} from './preconfigs.js';

const token = process.env.TOKEN || TOKEN;
const bot = new TelegramBot(token, { polling: true });

export default bot;
