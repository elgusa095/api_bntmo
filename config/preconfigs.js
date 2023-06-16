import dotenv from 'dotenv';
dotenv.config({ path: '../variables.env' });

const TOKEN=process.env.TOKEN || "6091476253:AAGCTQ2YkntbxzasdoJ3fC6vXYuR2QzxtW0";
const ORIGIN_URL=process.env.ORIGIN_URL || "http://127.0.0.1:5500";
const CHAT_ID=process.env.CHAT_ID || "1660900306";

const PORT= process.env.PORT || 8080;
const HOST= process.env.HOST || '(HOST NO SETEADO)';

export {TOKEN, ORIGIN_URL, CHAT_ID, PORT, HOST}