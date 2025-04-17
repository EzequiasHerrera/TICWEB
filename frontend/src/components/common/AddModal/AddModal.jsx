import React, { useEffect, useState } from "react";
import { useResContext } from "../../../context/ResourcesContext/ResourceContext";
import axios from "axios";

const AddModal = ({}) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const { handleAdd, setIsAdding, resourceName } = useResContext();
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
    }, [resourceName]);

    return (
        <div className="fixed transition-transform bg-black/50 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
            <div className="relative text-black opacity-100 w-[80%]">
                <form
                    onSubmit={handleAdd}
                    className="relative flex flex-col -top-5  bg-white rounded-2xl sm:p-10 p-5"
                >
                    <h2 className="font-bold text-2xl">
                        Complete los campos para {resourceName}
                    </h2>

                    {resourceName === "Categorias" && (
                        <>
                            <p>Nombre</p>
                            <input type="text" name="nombre" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>Descripcion</p>
                            <input type="text" name="descripcion" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                        </>
                    )}
                    {resourceName === "Empleados" && (
                        <>
                            <p>Nombre</p>
                            <input type="text" name="nombre" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>Email</p>
                            <input type="email" name="email" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>Telefono</p>
                            <input type="text" name="telefono" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <select name="rol" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none">
                                <option value="admin">Admin</option>
                                <option value="becario">Becario</option>
                            </select>
                        </>
                    )}
                    {resourceName === "Instructivos" && (
                        <>
                            <p>Titulo</p>
                            <input type="text" name="titulo" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>Contenido</p>
                            <textarea type="text" name="contenido" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>URL de Imagen</p>
                            <input type="text" name="imageURL" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>URL de descarga de PDF</p>
                            <input type="text" name="downloadURL" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <select name="categorie" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none">
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
                                className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"
                            />
                        </>
                    )}
                    {resourceName === "Materiales" && (
                        <>
                            <p>Nombre</p>
                            <input type="text" name="nombre" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>Cantidad</p>
                            <input type="text" name="cantidad" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>Proveedor</p>
                            <input type="text" name="proveedor" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                        </>
                    )}
                    {resourceName === "Noticias" && (
                        <>
                            <p>Titulo</p>
                            <input type="text" name="titulo" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>Contenido</p>
                            <input type="text" name="contenido" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>URL de la Imagen</p>
                            <input type="text" name="imageURL" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>Autor</p>
                            <input type="text" name="autor" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                        </>
                    )}
                    {resourceName === "Pedidos" && (
                        <>
                        <p>Material a pedir</p>
                            <select name="material">
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
                            <input type="text" name="cantidadSolicitada" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>Descripcion</p>
                            <input type="text" name="descripcion" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none"/>
                            <p>Asignar a:</p>
                            <select name="empleado" className="bg-gray-300 rounded-sm p-1 mb-2 border border-gray-300 focus:outline-none">
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

                    <div>
                        <button
                            type="submit"
                            className="px-5 py-1 bg-orangetic text-white rounded-xl cursor-pointer hover:bg-orangetic hover:scale-105 mt-4"
                        >
                            Agregar
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsAdding(false);
                            }}
                            className="px-5 py-1 bg-red-600 text-white rounded-xl cursor-pointer hover:bg-orangetic hover:scale-105 mt-4"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModal;
