import React, { useState } from "react";
import isologotipoUTN from '@/assets/images/isologotipoutn.png';

const Footer = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [footerInfo, setFooterInfo] = useState();

    useState(async () => {
        await fetch(`${backendURL}/home`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setFooterInfo(data.datos);
            })
            .catch((error) => error);
    }, []);

    return (
        <div className="w-full py-6 sm:px-20 bg-gray-950 grid md:grid-cols-[1fr_1fr] grid-cols-1 items-center gap-3 text-center justify-center">
            <div className="sm:p-4 p-6 flex justify-center">
                <img
                    className="max-w-[250px]"
                    src={isologotipoUTN}
                    alt={footerInfo ? footerInfo.descripcion : "Imagen"}
                />
            </div>

            <div className="p-2">
                <h3 className="font-semibold">INFORMACIÓN</h3>
                <p>{footerInfo ? footerInfo.email : "Cargando"}</p>
                <p>{footerInfo ? footerInfo.interno : "Cargando"}</p>
            </div>
        </div>
    );
};

export default Footer;
