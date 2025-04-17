import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import ResourcesContainer from "../../components/specific/ResourcesContainer/ResourcesContainer";
import axios from "axios";
import { useResContext } from "../../context/ResourcesContext/ResourceContext";
import ConfirmModal from "../../components/common/ConfirmModal/ConfirmModal";
import AddModal from "../../components/common/AddModal/AddModal";
import { useNavigate } from "react-router-dom";
import EditModal from "../../components/common/EditModal/EditModal";

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const {
        setResourceName,
        setResourceURL,
        resourceURL,
        resourceName,
        setResourceList,
        setIsAdding,
        isDeleting,
        isAdding,
        isEditing,
        filterWord,
        setFilterWord,
        selectedResource,
    } = useResContext();

    useEffect(() => {
        if (user && user.rol !== "admin" && user.rol !== "becario") {
            navigate("/home");
        }

        if (resourceURL) {
            axios
                .get(`${backendURL}${resourceURL}`, { withCredentials: true })
                .then((res) => {
                    setResourceList(res.data);
                });
        }
    }, [resourceURL, user, navigate]);

    const handleChange = (e) => {
        setFilterWord(e.target.value);
    };

    const handleOption = (e) => {
        setResourceURL(e.url);
        setResourceName(e.name);
    };

    const options = [
        { name: "Categorias", url: "/home/categorias", justAdmin: true },
        { name: "Empleados", url: "/empleados", justAdmin: true },
        { name: "Instructivos", url: "/home/instructivos", justAdmin: true },
        { name: "Materiales", url: "/empleados/materiales", justAdmin: true },
        { name: "Noticias", url: "/home/noticias", justAdmin: false },
        { name: "Pedidos", url: "/empleados/pedidos", justAdmin: false },
        { name: "Solicitudes", url: "/home/solicitudes", justAdmin: false },
    ];

    return (
        <div className="bg-gray-950 w-full min-h-[calc(100vh-160px)] flex flex-col items-center">
            <div className="flex justify-center bg-blue-200 items-center sm:rounded-3xl w-full sm:w-[calc(95%)]">
                <div className="w-full sm:w-min px-0 lg:w-auto flex flex-col text-center items-center p-4">
                    <h1 className="sm:w-full lg:text-7xl md:text-6xl text-5xl text-center break-all sm:break-normal  text-orangetic font-extrabold md:leading-16 lg:leading-20 ">
                        MENU
                    </h1>
                    <span className="lg:text-4xl md:text-3xl text-2xl text-nowrap bg-black w-full font-bold p-1 mt-2">
                        PARA {user?.rol.toUpperCase()}S
                    </span>
                </div>
            </div>

            <div className="w-full h-full flex flex-col md:flex-row">
                <aside className="w-full sm:w-auto sm:h-full">
                    <div className="flex flex-row md:flex-col justify-center items-center flex-wrap p-2 gap-2 sm:pt-15">
                        {user &&
                            options
                                .filter(
                                    (option) =>
                                        !(
                                            option.justAdmin &&
                                            user?.rol === "becario"
                                        )
                                )
                                .map((option, index) => (
                                    <button
                                        className="bg-orangetic hover:scale-105 shadow-white hover:drop-shadow-lg rounded-full w-15 h-15 leading-15 text-center cursor-pointer"
                                        key={index}
                                        onClick={() => handleOption(option)}
                                    >
                                        {option.name.charAt(0)}
                                    </button>
                                ))}
                    </div>
                </aside>

                <div className="w-full flex flex-col items-center">
                    <nav className="w-full h-min px-6 py-3 flex flex-row justify-center sm:justify-between items-center">
                        <p className="hidden sm:block font-bold">
                            Lista de {resourceName}
                        </p>
                        <div className="space-x-2 flex flex-col sm:flex-row">
                            <button
                                onClick={() => {
                                    if (
                                        resourceURL &&
                                        resourceName !== "Solicitudes"
                                    ) {
                                        setIsAdding(true);
                                    }
                                }}
                                className={`${
                                    !resourceURL ||
                                    resourceName === "Solicitudes"
                                        ? "bg-gray-700 cursor-not-allowed"
                                        : "bg-green-700 cursor-pointer hover:scale-105 hover:bg-green-300"
                                } rounded-2xl text-nowrap p-1 px-3 my-3 sm:my-0`}
                            >
                                + Agregar Nuevo
                            </button>

                            <div className="relative w-full max-w-md">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    🔍
                                </span>
                                <input
                                    className="bg-white text-black rounded-2xl p-1 pl-12 w-full focus:outline-none"
                                    type="search"
                                    placeholder="Busca aquí..."
                                    value={filterWord}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </nav>

                    <ResourcesContainer />
                </div>
            </div>
            {isEditing && !isAdding && <EditModal resource={selectedResource} />}
            {isAdding && !isEditing && <AddModal />}
            {isDeleting && !isAdding && !isEditing && <ConfirmModal action={"eliminar"} />}
        </div>
    );
};

export default Admin;
