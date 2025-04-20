import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import Button from "../../components/common/Button/Button";
import TicketForm from "../../components/specific/TicketForm/TicketForm";
import ActionAlert from "../../components/common/ActionAlert/ActionAlert";

const Tickets = () => {
    const { user } = useAuth();
    const [showActive, setShowActive] = useState();
    const [isSuccess, setIsSuccess] = useState();

    return (
        <div className="bg-gray-950 w-full min-h-[calc(100vh-160px)] flex flex-col items-center sm:px-6">
            {showActive && isSuccess && <ActionAlert text="Ticket enviado con éxito" type="success" />}
            {showActive && !isSuccess && <ActionAlert text="Ticket enviado con éxito" />}

            {user?.rol.toUpperCase() === "INVITADO" && (
                <div className="fixed text-center transition-transform bg-black/50 backdrop-blur-sm inset-0 flex items-center justify-center">
                    <div className="fixed flex flex-col items-center m-6 bg-white text-black rounded-2xl sm:p-10 p-5">
                        <img
                            className="size-15"
                            src="src/assets/images/alertapixel.webp"
                            alt=""
                        />
                        <p className="p-3 sm:p-6 text-2xl">
                            Necesitas estar logueado para utilizar esta función
                        </p>
                        <div className="flex gap-3 text-center text-xl">
                            <Button to={"/home"}>Volver</Button>
                            <Button api="/api/auth/microsoft">Ingresar</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-blue-200 flex flex-col sm:flex-row sm:justify-between items-center sm:items-end sm:rounded-3xl w-full sm:p-4 sm:py-0">
                <div className="flex flex-col text-center w-full h-min sm:h-90 sm:w-min px-0 lg:w-auto p-4">
                    <h1 className="w-full lg:text-7xl md:text-6xl text-5xl text-wrap text-center break-normal text-orangetic font-extrabold md:leading-16 lg:leading-20 ">
                        ENVIO DE TICKETS
                    </h1>
                    <span className="lg:text-4xl md:text-3xl text-2xl bg-black w-full font-bold p-1 mt-2">
                        PARA {user?.rol.toUpperCase()}S
                    </span>
                </div>

                <TicketForm showActive={showActive} setShowActive={setShowActive} setIsSuccess={setIsSuccess}/>
            </div>
        </div>
    );
};

export default Tickets;
