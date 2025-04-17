import React, { useEffect, useState } from "react";
import InfoCard from "../../common/InfoCard/InfoCard";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import axios from "axios";

const InstructivosContainer = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const { user } = useAuth();
    const [instructivos, setInstructivos] = useState([]);

    useEffect(() => {
        axios
            .get(`${backendURL}/home/instructivos`, {
                withCredentials: true,
            })
            .then((res) => {
                setInstructivos(res.data);
                console.log(instructivos);
            })
            .catch((err) => console.log("Ha ocurrido un error", err));
    }, []);

    return (
        <section className="w-full flex flex-wrap justify-center gap-3 p-6">
            {/* {instructivos.length > 0 ? console.log(instructivos) : ""} */}
            {instructivos.length > 0
                ? instructivos.map((instructivo) => (
                      <InfoCard key={instructivo._id} infoItem={instructivo} />
                  ))
                : Array.from({ length: 3 }).map((_, index) => (
                      <InfoCard key={index} isloadingCard={true} />
                  ))}
        </section>
    );
};

export default InstructivosContainer;
