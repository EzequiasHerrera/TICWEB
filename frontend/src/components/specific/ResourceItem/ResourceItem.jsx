import React, { useState } from "react";
import { useResContext } from "../../../context/ResourcesContext/ResourceContext";

const ResourceItem = ({ resource }) => {
    const {
        setIsDeleting,
        setIdSelected,
        resourceName,
        setSelectedResource,
        setIsEditing,
    } = useResContext(); //MODULARIZAR DE FORMA QUE EL MODAL SEA GENERICO TANTO PARA BORRAR COMO PARA EDITAR UN RECURSO

    const estadoColors = {
        pendiente: "bg-red-400 text-white font-bold",
        en_proceso: "bg-yellow-400 text-black",
        completada: "bg-green-500 text-white",
    };    

    const getMaterialColor = () => {
        if (resourceName === "Materiales") {
            if (resource.cantidad === 0) return "bg-red-700";
            if (resource.cantidad <= 3) return "bg-yellow-500";
        }
        return null;
    };

    return (
        <div
            className={`${
                getMaterialColor() ||
                estadoColors[resource.estado] ||
                "bg-gray-600"
            } flex flex-row justify-between items-center w-full rounded-xl p-2 m-1 shadow-black drop-shadow-md`}
        >
            <p className="w-[60%] text-sm sm:text-lg truncate">
                {resource.nombre ||
                    resource.titulo ||
                    resource.asunto ||
                    resource.descripcion ||
                    "Sin título"}
            </p>

            {resourceName === "Materiales" && (
                <p className="font-extrabold text-nowrap mx-3">Stock: {resource.cantidad}</p>
            )}

            {resourceName === "Pedidos" && resource.materiales?.[0] && (
                <p className="font-extrabold mx-3">
                    {resource.materiales[0].cantidadSolicitada}
                </p>
            )}

            {resourceName === "Pedidos" && (
                <p className="mx-3 text-xs sm:text-sm text-gray-300">
                    {formatDate(resource.updatedAt)}
                </p>
            )}

            {resourceName === "Solicitudes" &&
                (resource.empleado?.nombre || "Sin Asignar")}

            {resourceName === "Pedidos" &&
                (resource.empleado?.nombre || "Sin Asignar")}

            <div className="space-x-1 sm:space-x-2 flex flex-col justify-end sm:flex-row">
                <button
                    onClick={() => {
                        setIdSelected(resource._id), setIsDeleting(true);
                    }}
                    className="bg-red-600 cursor-pointer rounded-2xl text-nowrap p-1 hover:bg-red-400"
                >
                    ❌ Eliminar
                </button>
                <button
                    onClick={() => {
                        setSelectedResource(resource), setIsEditing(true);
                    }}
                    className="bg-blue-500 cursor-pointer rounded-2xl text-nowrap p-1 hover:bg-blue-300"
                >
                    ✍🏻 Editar
                </button>
            </div>
        </div>
    );
};

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("es-ES", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

export default ResourceItem;
