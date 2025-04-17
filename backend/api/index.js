const Server = require("../Server"); // Importa tu clase Server
const server = new Server(); // Crea la instancia del servidor

module.exports = server.app; // Exporta la instancia del servidor para que Vercel la use