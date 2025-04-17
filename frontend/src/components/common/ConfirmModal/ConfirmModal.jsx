import React from "react";
import { useResContext } from "../../../context/ResourcesContext/ResourceContext";

const ConfirmModal = ({ action }) => {
    const { handleDelete, setIsDeleting } = useResContext();
    return (
        <div className="fixed transition-transform bg-black/50 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
            <div className="relative text-black opacity-100 w-[80%]">
                <div className="relative -top-5 bg-white rounded-2xl sm:p-10 p-5">
                    <h2 className="font-bold text-2xl">
                        ¿Estas seguro que deseas {action}?
                    </h2>
                    <button
                        onClick={() => handleDelete()}
                        className="px-5 py-1 bg-orangetic text-white rounded-xl cursor-pointer hover:bg-orangetic hover:scale-105 mt-4"
                    >
                        Borrar
                    </button>
                    <button
                            type="button"
                            onClick={() => {
                                setIsDeleting(false);
                            }}
                            className="px-5 py-1 bg-red-600 text-white rounded-xl cursor-pointer hover:bg-orangetic hover:scale-105 mt-4"
                        >
                            Cancelar
                        </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
