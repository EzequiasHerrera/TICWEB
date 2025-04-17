import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import Button from "../../../components/common/Button/Button";
import axios from "axios";

const TicketForm = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    // const {handleSendTicket} =

    //FALTA DESARROLLAR EL ENVIO DEL TICKET A LA BASE DE DATOS
    const handleSendTicket = (e) => {
        //ES LA MISMA LOGICA QUE CREAR UN RECURSO
        e.preventDefault();
        const form = e.target;

        const solicitud = {
            emailSolicitante: form.email.placeholder,
            asunto: form.asunto.value,
            texto: form.descripcion.value,
            categoria: form.categoria.value,
        };

        axios
            .post(`${backendURL}/home/solicitudes`, solicitud)
            .then((res) => console.log("Ticket enviado:", res.data))
            .catch((err) => console.error("Error al enviar el ticket:", err));
    };

    useEffect(() => {
        axios
            .get(`${backendURL}/home/categorias`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <form
            onSubmit={handleSendTicket}
            className=" bg-white text-black w-[95%] sm:max-w-[55%] mx-3 p-4 mt-5 shadow-black shadow-2xl rounded-xs"
        >
            <div className="flex justify-center items-center">
                <h1 className="text-gray-700 text-2xl font-bold text-center mb-3 underline underline-offset-2 decoration-3">
                    INFORMACIÓN DE TICKET
                </h1>
            </div>
            <hr className="border-gray-400 mb-4" />

            <div className="flex flex-col gap-3 px-3">
                <input
                    className="bg-gray-200 border border-gray-300 rounded-md p-2 focus:outline-none"
                    type="email"
                    name="email"
                    placeholder={user?.email || "Cargando email"}
                    readOnly
                    required
                />

                <input
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                    type="text"
                    name="asunto"
                    placeholder="Ingrese el asunto"
                    required
                />

                <select
                    name="categoria"
                    className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none"
                    required
                >
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <option
                                className="text-xs"
                                key={category._id}
                                value={category._id}
                            >
                                {category.nombre}
                            </option>
                        ))
                    ) : (
                        <option value="">Cargando Opciones...</option>
                    )}
                </select>

                <textarea
                    className="border border-gray-300 selection:bg-orangetic selection:text-white rounded-md p-2 resize-none focus:outline-none"
                    name="descripcion"
                    rows="4"
                    placeholder="Describa el problema..."
                    required
                ></textarea>

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                    Enviar Ticket
                </button>
            </div>
        </form>
    );
};

export default TicketForm;
