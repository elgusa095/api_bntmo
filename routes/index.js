import express from 'express';
import bot from '../config/botConfig.js';
import { CHAT_ID } from '../config/preconfigs.js';

const router = express.Router();

// Variable para almacenar la opción seleccionada por cada cliente
let opcionSeleccionada;

router.post('/generals', (req, res) => {
  // Enviar las opciones al chat de Telegram y obtener el identificador del mensaje enviado
  const messageId = enviarOpciones();

  // Esperar la respuesta desde el chat de Telegram y enviarla en res.json()
  const context = {
    res: res,
    messageId: messageId
  };

  bot.once('callback_query', (query) => {
    // Actualizar la opción seleccionada
    opcionSeleccionada = query.data;

    // Limpiar los botones de la conversación
    bot.editMessageReplyMarkup({ chat_id: CHAT_ID, message_id: context.messageId });

    // Enviar la opción seleccionada en res.json()
    if (context.res) {
      context.res.json({ opt: opcionSeleccionada });
      context.res = null; // Eliminar la referencia a res para evitar respuestas duplicadas
    }
  });
});

function enviarOpciones() {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Opción 1', callback_data: 'opcion1' },
          { text: 'Opción 2', callback_data: 'opcion2' },
          { text: 'Opción 3', callback_data: 'opcion3' }
        ]
      ],
      one_time_keyboard: true
    }
  };

  return bot.sendMessage(CHAT_ID, 'Elige una opción:', opts)
    .then(message => {
      console.log(message.message_id);
      return message.message_id;
    })
    .catch(error => {
      console.error('Error al enviar el mensaje:', error);
      return null;
    });
}


export default router;