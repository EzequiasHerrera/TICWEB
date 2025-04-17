import React, { useEffect, useState } from "react";
import { useResContext } from "../../../context/ResourcesContext/ResourceContext";
import axios from "axios";

const EditModal = ({}) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const { handleEdit, setIsEditing, resourceName, selectedResource } =
        useResContext();
    const [categories, setCategories] = useState();
    const [materiales, setMateriales] = useState();
    const [empleados, setEmpleados] = useState();

    useEffect(() => {
        if (resourceName === "Instructivos") {
            axios
                .get(`${backendURL}/home/categorias`, { withCredentials: true })
                .then((res) => setCategories(res.data))
                .catch((err) => console.error(err));
        }

        if (resourceName === "Pedidos") {
            axios
                .get(`${backendURL}/empleados/materiales`, {
                    withCredentials: true,
                })
                .then((res) => setMateriales(res.data))
                .catch((err) => console.error(err));

            axios
                .get(`${backendURL}/empleados`, { withCredentials: true })
                .then((res) => setEmpleados(res.data))
                .catch((err) => console.error(err));
        }

        if (resourceName === "Solicitudes") {
            axios
                .get(`${backendURL}/empleados`, { withCredentials: true })
                .then((res) => setEmpleados(res.data))
                .catch((err) => console.error(err));

            axios
                .get(`${backendURL}/home/categorias`, { withCredentials: true })
                .then((res) => setCategories(res.data))
                .catch((err) => console.error(err));
        }
    }, [resourceName]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el refresh de la página

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (data.soloEmpleados !== undefined) {
            data.soloEmpleados = formData.get("soloEmpleados") === "on";
        }

        if (data.empleado) {
            const empleadoSeleccionado = empleados.find(
                (empleado) => empleado._id === data.empleado
            );
            data.empleado = {
                _id: empleadoSeleccionado._id,
                nombre: empleadoSeleccionado.nombre,
            };
        } else {
            data.empleado = null; // En caso de que no se asigne empleado
        }

        handleEdit(selectedResource?._id, data);
        setIsEditing(false);
    };

    return selectedResource ? (
        <div className="fixed transition-transform bg-black/50 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
            <div className="relative text-black opacity-100 w-[80%]">
                <form
                    onSubmit={handleSubmit}
                    className="relative flex flex-col -top-5 bg-white rounded-2xl sm:p-10 p-5"
                >
                    <h2 className="font-bold text-2xl">
                        Edite los campos para {resourceName}
                    </h2>

                    {resourceName === "Categorias" && (
                        <>
                            <p className="font-medium">Nombre</p>
                            <input
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                                type="text"
                                name="nombre"
                                defaultValue={selectedResource?.nombre || ""}
                            />
                            <p className="font-medium">Descripcion</p>
                            <input
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                                type="text"
                                name="descripcion"
                                defaultValue={
                                    selectedResource?.descripcion || ""
                                }
                            />
                        </>
                    )}
                    {resourceName === "Empleados" && (
                        <>
                            <p>Nombre</p>
                            <input
                                type="text"
                                name="nombre"
                                defaultValue={selectedResource?.nombre || ""}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>Email</p>
                            <input
                                type="email"
                                name="email"
                                defaultValue={selectedResource?.email || ""}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>Telefono</p>
                            <input
                                type="text"
                                name="telefono"
                                defaultValue={selectedResource?.text || ""}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <select
                                name="rol"
                                defaultValue={selectedResource?.rol}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            >
                                <option value="admin">Admin</option>
                                <option value="becario">Becario</option>
                            </select>
                        </>
                    )}
                    {resourceName === "Instructivos" && (
                        <>
                            <p>Titulo</p>
                            <input
                                type="text"
                                name="titulo"
                                defaultValue={selectedResource?.titulo || ""}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>Contenido</p>
                            <textarea
                                type="text"
                                name="contenido"
                                defaultValue={selectedResource?.contenido || ""}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>URL de Imagen</p>
                            <input
                                type="text"
                                name="imageURL"
                                defaultValue={selectedResource?.imageURL || ""}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>URL de descarga de PDF</p>
                            <input
                                type="text"
                                name="downloadURL"
                                defaultValue={
                                    selectedResource?.downloadURL || ""
                                }
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <select
                                name="categorie"
                                defaultValue={selectedResource?.categorie}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            >
                                {categories &&
                                    categories.map((categorie) => (
                                        <option
                                            key={categorie._id}
                                            value={categorie._id}
                                        >
                                            {categorie.nombre}
                                        </option>
                                    ))}
                            </select>

                            <p>¿Solo Empleados?</p>
                            <input
                                type="checkbox"
                                placeholder="Solo Empleados"
                                name="soloEmpleados"
                                defaultValue={selectedResource?.soloEmpleados}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                        </>
                    )}
                    {resourceName === "Materiales" && (
                        <>
                            <p>Nombre</p>
                            <input
                                type="text"
                                name="nombre"
                                defaultValue={selectedResource?.nombre}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>Cantidad</p>
                            <input
                                type="text"
                                name="cantidad"
                                defaultValue={selectedResource?.cantidad}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>Proveedor</p>
                            <input
                                type="text"
                                name="proveedor"
                                defaultValue={selectedResource?.proveedor}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                        </>
                    )}
                    {resourceName === "Noticias" && (
                        <>
                            <p>Título</p>
                            <input
                                type="text"
                                name="titulo"
                                defaultValue={selectedResource?.titulo}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>Contenido</p>
                            <input
                                type="text"
                                name="contenido"
                                defaultValue={selectedResource?.contenido}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>URL de la Imagen</p>
                            <input
                                type="text"
                                name="imageURL"
                                defaultValue={selectedResource?.imageURL}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>Autor</p>
                            <input
                                type="text"
                                name="autor"
                                defaultValue={selectedResource?.autor}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                        </>
                    )}
                    {resourceName === "Pedidos" && (
                        <>
                            <p>Material</p>
                            <select
                                name="material"
                                defaultValue={selectedResource?.material}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            >
                                {materiales &&
                                    materiales.map((material) => (
                                        <option
                                            key={material._id}
                                            value={material._id}
                                        >
                                            {material.nombre}
                                        </option>
                                    ))}
                            </select>

                            <p>Cantidad</p>
                            <input
                                type="text"
                                name="cantidadSolicitada"
                                defaultValue={
                                    selectedResource?.materiales[0].cantidadSolicitada
                                }
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>Descripción</p>
                            <input
                                type="text"
                                name="descripcion"
                                defaultValue={selectedResource?.descripcion}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p>Asignar a:</p>
                            <select
                                name="empleado"
                                defaultValue={selectedResource?.empleado}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            >
                                {empleados &&
                                    empleados.map((empleado) => (
                                        <option
                                            key={empleado._id}
                                            value={empleado._id}
                                        >
                                            {empleado.nombre}
                                        </option>
                                    ))}
                            </select>
                        </>
                    )}
                    {resourceName === "Solicitudes" && (
                        <>
                            <p className="font-medium">Email de Solicitante</p>
                            <input
                                type="text"
                                name="emailSolicitante"
                                defaultValue={
                                    selectedResource?.emailSolicitante
                                }
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p className="font-medium">Asunto</p>
                            <input
                                type="text"
                                name="asunto"
                                defaultValue={selectedResource?.asunto}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                            <p className="font-medium">Texto</p>
                            <textarea
                                name="texto"
                                defaultValue={selectedResource?.texto}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            ></textarea>

                            <p className="font-medium">Categoría</p>
                            <select
                                name="categorie"
                                defaultValue={selectedResource?.categorie}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            >
                                {categories &&
                                    categories.map((categorie) => (
                                        <option
                                            key={categorie._id}
                                            value={categorie._id}
                                        >
                                            {categorie.nombre}
                                        </option>
                                    ))}
                            </select>

                            <p className="font-medium">Notas del Moderador</p>
                            <textarea
                                name="notas"
                                defaultValue={selectedResource?.notas}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            ></textarea>

                            <p className="font-medium">Asignado a</p>
                            <select
                                name="empleado"
                                defaultValue={selectedResource?.empleado}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            >
                                {empleados &&
                                    empleados.map((empleado) => (
                                        <option
                                            key={empleado._id}
                                            value={empleado._id}
                                        >
                                            {empleado.nombre}
                                        </option>
                                    ))}
                            </select>

                            <p className="font-medium">Estado</p>
                            <select
                                name="estado"
                                defaultValue={selectedResource?.estado}
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="en_proceso">En Proceso</option>
                                <option value="completada">Completada</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                        </>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="px-5 py-1 bg-orangetic text-white rounded-xl cursor-pointer hover:bg-orangetic hover:scale-105 mt-4"
                        >
                            Confirmar
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                            }}
                            className="px-5 py-1 bg-red-600 text-white rounded-xl cursor-pointer hover:bg-orangetic hover:scale-105 mt-4"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <h2>Cargando Datos...</h2>
    );
};

export default EditModal;
