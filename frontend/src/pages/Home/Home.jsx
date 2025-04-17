import React, { useEffect } from "react";
import Tablet from "../../components/specific/TabletMenu/Tablet";
import Button from "../../components/common/Button/Button.jsx";
import TabletButton from "../../components/specific/TabletButton/TabletButton.jsx";
import NewsContainer from "../../components/specific/NewsContainer/NewsContainer.jsx";
import { useAuth } from "../../context/AuthContext/AuthContext.jsx";

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="bg-gray-950 w-full min-h-[calc(100vh-160px)] flex flex-col items-center sm:px-6">
            <div className="bg-blue-200 flex flex-col sm:rounded-3xl md:flex-row items-center sm:align-middle md:p-6 md:pr-0 w-full max-w-7xl md:h-[450px] h-auto overflow-hidden">
                <div className="w-full px-0 md:w-60 lg:w-auto  flex flex-col text-center items-center p-4">
                    <h1 className="lg:text-8xl md:text-7xl text-6xl text-wrap text-center lg:break-normal md:break-all text-orangetic font-extrabold md:leading-16 lg:leading-20">
                        T.I.C SERVICE
                    </h1>

                    <span className="lg:text-5xl md:text-4xl text-3xl bg-black w-full font-bold p-1 mt-2">
                        OFFICIAL SITE
                    </span>
                </div>

                <Tablet>
                    <TabletButton
                        to={"/instructivos"}
                        icon="tic"
                        name={"Instructivos"}
                    />

                    {(user?.rol.toUpperCase() === "ADMIN" || user?.rol === "becario") && (
                        <TabletButton
                            to={"/admin-menu"}
                            icon="tic"
                            name={"Menu Admin"}
                        />
                    )}

                    <TabletButton
                        to={"/tickets"}
                        icon="tic"
                        name={"Enviar ticket"}
                    />
                </Tablet>
            </div>

            <NewsContainer />
        </div>
    );
};

export default Home;
