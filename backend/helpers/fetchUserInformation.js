const { default: axios } = require("axios");
const Empleado = require("../models/empleados");

const fetchUserInformation = async (accessToken, isFirstAdmin = false) => {
    if (!accessToken) return null;

    try {
        const userResponse = await axios.get(
            "https://graph.microsoft.com/v1.0/me",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const { displayName, mail } = userResponse.data;
        const usuarioBuscado = await Empleado.findOne({ email: mail });

        let user = {
            nombre: displayName,
            email: mail,
        };

        let rol = "estudiante";

        if (isFirstAdmin === true && user.email.endsWith("@inspt.utn.edu.ar")) {
            rol = "admin";
            const primerAdmin = new Empleado(user); // <-- Cambié de datosUsuario a user, asumí que eso era lo correcto
            await primerAdmin.save();
        } else if (usuarioBuscado) {
            rol = usuarioBuscado.rol;
        }

        return { ...user, rol };

    } catch (error) {
        console.error("❌ Error en fetchUserInformation:", error.response?.status);

        // Token expirado o inválido
        if (error.response?.status === 401) {
            throw new Error("Token expirado o inválido");
        }

        throw error; // Otros errores
    }
};

module.exports = {
    fetchUserInformation,
};
