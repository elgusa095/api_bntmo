import { Blacklist } from "../config/db.js";
import { ORIGIN_URL } from "../config/preconfigs.js";

const verifies = (req, res, next) => {
    console.log('FIRST MIDDLEWARE: ');
  
    // Validate from blacklist
    async function userExists() {
      try {
        const user = await Blacklist.findOne({ where: { ip: req.ip.split(':').pop() } });
        return !!user; // Devuelve true si el usuario existe, o false si no existe
      } catch (error) {
        console.error('Error al verificar la existencia del usuario:', error);
        return false; // Manejo de errores
      }
    };
  
    userExists()
      .then(exist => {
        if (exist) {
          // Redirect to real web
          console.log('Tas baneado, perro');
        } else {
          console.log('No tas baneado');
          res.header('Access-Control-Allow-Origin', process.env.ORIGIN_URL || ORIGIN_URL);
          res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
          res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection');
          if (req.method === 'OPTIONS') {
            res.sendStatus(200);
          } else {
            next();
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

export default verifies