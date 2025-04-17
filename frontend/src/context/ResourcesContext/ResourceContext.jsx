import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [resourceName, setResourceName] = useState(null);
    const [resourceURL, setResourceURL] = useState(null);
    const [resourceList, setResourceList] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);
    const [idSelected, setIdSelected] = useState(null);

    const [isDeleting, setIsDeleting] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [filterWord, setFilterWord] = useState("");

    const clearStates = () => {
        setIdSelected(null);
    };

    const handleDelete = () => {
        setIsDeleting(false);

        axios
            .delete(`${backendURL}${resourceURL}/${idSelected}`, {
                withCredentials: true,
            })
            .then((res) => {
                setResourceList(res.data);
            });

        console.log("Borrado Correctamente");
        clearStates();
    };

    const handleEdit = async (id, data) => {
        setIsEditing(false);

        try {
            const response = await axios.put(
                `${backendURL}${resourceURL}/${id}`,
                data,
                { withCredentials: true }
            );

            setResourceList((prevList) =>
                prevList.map((item) =>
                    item._id === response.data._id ? response.data : item
                )
            );

            setIsAdding(false);
        } catch (err) {
            console.error("❌ Error al editar:", err);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        let data = {};
    
        if (resourceName === "Pedidos") {
            const empleadoId = formData.get("empleado");
            const materialId = formData.get("material");
            const cantidad = formData.get("cantidadSolicitada");
    
            try {
                // Busco empleados y materiales para armar el objeto completo
                const [empleadosRes, materialesRes] = await Promise.all([
                    axios.get(`${backendURL}/empleados`, { withCredentials: true }),
                    axios.get(`${backendURL}/empleados/materiales`, { withCredentials: true }),
                ]);
    
                const empleado = empleadosRes.data.find(e => e._id === empleadoId);
                const material = materialesRes.data.find(m => m._id === materialId);
    
                if (!empleado || !material) {
                    console.error("Empleado o material no encontrado");
                    return;
                }
    
                data = {
                    descripcion: formData.get("descripcion"),
                    estado: "pendiente",
                    empleado: {
                        _id: empleado._id,
                        nombre: empleado.nombre,
                    },
                    materiales: [
                        {
                            _id: material._id,
                            nombre: material.nombre,
                            cantidadSolicitada: parseInt(cantidad),
                        },
                    ],
                };
            } catch (err) {
                console.error("❌ Error al preparar el pedido:", err);
                return;
            }
        } else {
            // Manejo genérico para otros recursos
            formData.forEach((value, key) => {
                if (key === "soloEmpleados") {
                    data[key] = value === "on";
                } else {
                    data[key] = value;
                }
            });
        }
    
        try {
            const response = await axios.post(`${backendURL}${resourceURL}`, data, {
                withCredentials: true,
            });
    
            setResourceList((prevList) => [...prevList, response.data]);
            setIsAdding(false);
        } catch (err) {
            console.error("❌ Error al agregar:", err);
        }
    };
    

    return (
        <ResourceContext.Provider
            value={{
                handleDelete,
                handleEdit,
                handleAdd,
                setResourceName,
                resourceName,
                setResourceURL,
                resourceURL,
                setResourceList,
                resourceList,
                setIsDeleting,
                isDeleting,
                setIdSelected,
                idSelected,
                setIsAdding,
                isAdding,
                setFilterWord,
                filterWord,
                setIsEditing,
                isEditing,
                setSelectedResource,
                selectedResource,
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
};

export const useResContext = () => useContext(ResourceContext);
