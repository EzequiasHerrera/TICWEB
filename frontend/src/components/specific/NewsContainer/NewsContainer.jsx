import React, { useEffect, useState, useRef } from "react";
import InfoCard from "../../common/InfoCard/InfoCard";
import InfoModal from "../../common/InfoModal/InfoModal";
import useInfoModal from "../../../hooks/useInfoModal/useInfoModal";
import axios from "axios";

const NewsContainer = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const { selectedInfo, handleClick, closeModal } = useInfoModal();
    const [noticias, setNoticias] = useState([]);
    const containerRef = useRef(null);
    const scrollInterval = useRef(null);

    useEffect(() => {
        axios
            .get(`${backendURL}/home/noticias/`, { withCredentials: true })
            .then((res) => setNoticias(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Función para hacer scroll suave
    const smoothScroll = (direction) => {
        if (!containerRef.current) return;
        let step = direction === "left" ? -30 : 30; // Velocidad del desplazamiento
        const move = () => {
            containerRef.current.scrollLeft += step;
            scrollInterval.current = requestAnimationFrame(move);
        };
        move();
    };

    // Detener el desplazamiento
    const stopScroll = () => {
        if (scrollInterval.current) cancelAnimationFrame(scrollInterval.current);
    };

    return (
        <section className="relative p-6 w-full">
            <h2 className="text-4xl text-left w-full font-semibold pb-6 leading-8">
                Portal de Noticias
            </h2>

            {/* Botón Izquierda */}
            <button
                onMouseDown={() => smoothScroll("left")}
                onMouseUp={stopScroll}
                onMouseLeave={stopScroll}
                className="hover:scale-105 cursor-pointer absolute left-0 top-1/2 text-2xl transform bg-orangetic text-white p-3 rounded-r-3xl z-10 hidden md:flex items-center justify-center"
            >
                ◀
            </button>

            {/* Contenedor de Noticias */}
            <div 
                ref={containerRef} 
                className="flex space-x-4 overflow-x-auto no-scrollbar p-1 scroll-smooth"
            >
                {noticias.length > 0
                    ? noticias.map((infoItem, index) => (
                          <InfoCard 
                              key={index} 
                              infoItem={infoItem} 
                              onClick={() => handleClick(infoItem)} 
                          />
                      ))
                    : Array.from({ length: 3 }).map((_, index) => (
                          <InfoCard key={index} isloadingCard={true} />
                      ))}
            </div>

            {/* Botón Derecha */}
            <button
                onMouseDown={() => smoothScroll("right")}
                onMouseUp={stopScroll}
                onMouseLeave={stopScroll}
                className="hover:scale-105 cursor-pointer absolute right-0 top-1/2 text-2xl transform bg-orangetic text-white p-3 rounded-l-3xl z-10 hidden md:flex items-center justify-center"
            >
                ▶
            </button>

            {selectedInfo && (
                <InfoModal info={selectedInfo} setSelectedInfo={closeModal} />
            )}

            <div className="absolute top-19 right-5 h-50 w-10 bg-gradient-to-l from-gray-950/100 via-gray-950/60 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default NewsContainer;
