import React from "react";

const Tablet = ({ children }) => {
  return (
    <div className="flex justify-end w-3xl sm:w-full sm:h-full overflow-hidden">
      <div
        className="bg-[url(src/assets/images/watchscreen.webp)] sm:bg-[url(src/assets/images/tabletonahand.webp)] bg-contain bg-no-repeat bg-center md:h-[400px] sm:bg-right sm:w-[500px] sm:h-[400px] w-[800px] h-[300px] relative
      
        before:content-[''] before:bg-white before:opacity-20 before:blur-xs before:pointer-events-none
        before:w-3 before:h-20 before:rotate-50 before:absolute before:z-50 before:left-94 before:top-28
        sm:before:w-3 sm:before:h-100 sm:before:left-50 sm:before:-top-0 sm:before:blur-xl sm:before:opacity-90
        
        after:content-[''] after:bg-white after:pointer-events-none
        
        sm:after:w-5 sm:after:h-70 sm:after:rotate-50 sm:after:absolute sm:after:right-55 sm:after:top-25 sm:after:blur-sm sm:after:opacity-10 sm:after:z-50"
      >
        <div className="bg-black flex flex-wrap sm:gap-1 overflow-scroll sm:p-5 sm:w-82 sm:h-61 sm:left-9 sm:top-19 w-18 h-21 left-87 top-28 rounded-xl no-scrollbar relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Tablet;
