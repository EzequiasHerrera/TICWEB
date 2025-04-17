import React from "react";

const NotFound = () => {
    return (
        <div className="bg-gray-950 w-full min-h-[calc(100vh-160px)] flex flex-col items-center sm:px-6">
          <img src="src/assets/images/alertapixel.webp" alt="" />
            <h1 className="text-4xl p-3 font-bold">404 NOT FOUND</h1>
            <p>Estás intentando ingresar a Narnia pequeño viajero... (No existe)</p>
        </div>
    );
};

export default NotFound;
