import React from "react";
import InstructivosContainer from "../../components/specific/InstructivosContainer/InstructivosContainer";
import { useAuth } from "../../context/AuthContext/AuthContext";

const Instructivos = () => {
    const { user } = useAuth();
    return (
        <div className="bg-gray-950 w-full min-h-[calc(100vh-160px)] flex flex-col items-center sm:px-6">
            <div className="bg-blue-200 flex flex-col items-center sm:rounded-3xl h-auto w-full sm:p-4 sm:py-0">
                <div className="w-full sm:w-min px-0 lg:w-auto flex flex-col text-center items-center p-4">
                    <h1 className="w-50 sm:w-full lg:text-7xl md:text-6xl text-5xl text-wrap text-center break-all sm:break-normal  text-orangetic font-extrabold md:leading-16 lg:leading-20 ">
                        INSTRUCTIVOS
                    </h1>
                    <span className="lg:text-4xl md:text-3xl text-2xl bg-black w-full font-bold p-1 mt-2">
                        PARA {user?.rol.toUpperCase()}S
                    </span>
                </div>
            </div>

            <InstructivosContainer />
        </div>
    );
};

export default Instructivos;
