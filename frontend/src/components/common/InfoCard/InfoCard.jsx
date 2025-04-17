import { useState } from "react";

const InfoCard = ({ infoItem, isloadingCard, onClick }) => {
    const [imageError, setImageError] = useState(false);

    if (!isloadingCard) {
        const isDownloadable = infoItem?.downloadURL;

        const cardContent = (
            <article
                className="relative transition-transform transform-gpu duration-50 ease-in-out hover:scale-105 cursor-pointer h-min min-w-70 w-80 text-left leading-5"
                onClick={onClick}>
                
                {/* Imagen o bloque gris si falla */}
                <figure>
                    {imageError || !infoItem?.imageURL ? (
                        <div className="bg-gray-500 w-full h-45 object-cover object-center rounded-2xl"></div>
                    ) : (
                        <img
                            className="w-full h-45 object-cover object-center rounded-2xl"
                            src={infoItem.imageURL}
                            alt=""
                            onError={() => setImageError(true)} // Si falla, mostramos el bloque gris
                        />
                    )}
                </figure>

                {infoItem?.date && (
                    <div className="absolute top-0 bg-orangetic rounded-2xl p-1 m-2 font-semibold">
                        {infoItem.date}
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl"></div>

                <h2 className="absolute bottom-0 p-2 text-lg font-medium leading-4 overflow-ellipsis">
                    {infoItem?.titulo || "Cargando Titulo..."}
                </h2>
            </article>
        );

        return isDownloadable ? (
            <a
                href={infoItem.downloadURL}
                target="_blank"
                rel="noopener noreferrer"
                download // Esto solo funciona si el mismo origen permite descarga
            >
                {cardContent}
            </a>
        ) : (
            cardContent
        );
    }

    return (
        <article className="relative transition-transform transform-gpu duration-50 ease-in-out hover:scale-105 h-min min-w-70 w-80 text-left leading-5">
            <figure>
                <div className="bg-gray-500 w-full h-45 object-cover object-center rounded-2xl"></div>
            </figure>

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent rounded-b-1xl"></div>

            <h2 className="absolute bottom-0 p-2 text-lg font-medium leading-4 overflow-ellipsis">
                Cargando Titulo...
            </h2>
        </article>
    );
};

export default InfoCard;
