const axios = require("axios");
const { checkExists } = require("../helpers/errorHandler");
const Empleado = require("../models/empleados");
const { fetchUserInformation } = require("../helpers/fetchUserInformation")

const userInfo = async (req, res) => {
  const authToken = req.cookies?.auth_token;

  if (!authToken) {
      return res.status(401).json({ rol: "Invitado", msg: "No hay token" });
  }

  try {
      const user = await fetchUserInformation(authToken);
      res.json(user);
  } catch (error) {
      console.error("❌ Error en userInfo:", error.message);

      if (error.message.includes("expirado") || error.message.includes("inválido")) {
          // También podrías borrar la cookie acá si querés
          res.clearCookie("auth_token", {
              httpOnly: true,
              secure: false,
              sameSite: "lax",
          });

          return res.status(401).json({ rol: "Invitado", msg: "Token expirado" });
      }

      res.status(500).json({ msg: "Error al verificar sesión" });
  }
};


const logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "Logout exitoso" });
};

const loginMicrosoft = (req, res) => {
  res.redirect(getUrlLogin());
};

const loginCallback = async (req, res, next) => {
  const { code } = req.query;
  checkExists(code, "No se encontro el codigo de autorización", 400);

  const params = new URLSearchParams();
  params.append("client_id", process.env.CLIENT_ID);
  params.append("client_secret", process.env.CLIENT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", process.env.REDIRECT_URI);

  try {
    // obtener un token de acceso
    const response = await axios.post(
      `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = response.data.access_token;
    const user = await fetchUserInformation(accessToken, req.isFirstAdmin); //UN MIDDLEWARE CHEQUEA LA BD Y SI NO HAY USERS TRAE ISFIRSTADMIN = TRUE

    checkExists(user.email.endsWith("@alu.inspt.utn.edu.ar") || user.email.endsWith("@inspt.utn.edu.ar"),
      "Acceso denegado",
      403
    );

    res.cookie("auth_token", accessToken, {
      httpOnly: true,    // No accesible desde JavaScript (más seguro)
      secure: false,     // En producción debe ser `true`
      sameSite: "Lax",   // Permite compartir la cookie entre frontend y backend
      maxAge: 15 * 60 * 1000, //MINUTOS. CAMBIAR EL 1
    });

    res.redirect('https://tic-web-five.vercel.app/home');

  } catch (error) {
    next(error);
  }
};

function getUrlLogin() { //LINK QUE SE CREA PARA LLEGAR AL LOGIN DE INSPT
  const client_tenant = process.env.TENANT_ID;
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;

  return `https://login.microsoftonline.com/${client_tenant}/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=openid%20profile%20email%20User.Read`;
}

module.exports = {
  loginMicrosoft,
  loginCallback,
  userInfo,
  logout,
};
