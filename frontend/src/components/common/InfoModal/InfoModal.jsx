import React from "react";

const InfoModal = ({ info, setSelectedInfo }) => {
    return (
        <div className="fixed transition-transform bg-black/50 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
            <div className="relative text-black opacity-100 w-[80%] min-h-[90%]">
                {info?.imageURL ? (
                    <img
                        className="w-full h-40 object-cover object-center rounded-t-2xl"
                        src={info.imageURL}
                    />
                ) : (
                    <div className="bg-gray-500 w-full h-40 rounded-t-2xl" />
                )}

                <div className="absolute top-24 bg-gradient-to-t from-black/80 to-transparent w-full h-15"></div>

                <div className="relative -top-5 bg-white rounded-2xl sm:p-10 p-5">
                    <h2 className="font-bold text-2xl">{info.titulo}</h2>
                    <p className="font-semibold text-sm text-gray-700 pb-3">
                        Por: {info.autor}
                    </p>
                    <p className="sm:p-3 p-1 text-sm sm:text-lg overflow-scroll no-scrollbar max-h-50">
                        {info.contenido}
                    </p>
                    <button
                        className="px-5 py-1 bg-orangetic text-white rounded-xl cursor-pointer hover:bg-orangetic hover:scale-105 mt-4"
                        onClick={() => setSelectedInfo(null)}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
