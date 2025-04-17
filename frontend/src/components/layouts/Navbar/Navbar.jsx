import React from "react";
import Button from "../../common/Button/Button";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import logoFull from '@/assets/images/logofull.webp';

const Navbar = () => {
    const { user, setUser } = useAuth();
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const handleLogout = async () => {
        await fetch(`${backendURL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
        window.location.reload();
        // window.location.href =
        //     "https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=http://localhost:5173/";
    };

    return (
        <nav className="flex justify-between items-center w-full h-20 sm:px-10 px-3 bg-gray-950 text-white">
            <Link to="/home">
                <img
                    className="size-15"
                    src={logoFull}
                    alt="Logo TIC Full"
                />
            </Link>
            <ul className="flex flex-row items-center gap-2 text-center leading-4">
                <li className="w-min">
                    <p className="text-wrap break-normal">
                        {user?.nombre ?? user?.rol ?? "Cargando..."}
                    </p>
                </li>
                <li>
                    {user?.rol != "Invitado" ? (
                        <Button onClick={handleLogout}>Cerrar Sesion</Button>
                    ) : (
                        <Button api="/api/auth/microsoft">Ingresar</Button>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
