import { useState } from "react";

const useInfoModal = () => {
    const [selectedInfo, setSelectedInfo] = useState(null);

    const handleClick = (info) => {
        setSelectedInfo(info);
    };

    const closeModal = () => {
        setSelectedInfo(null);
    };

    return {
        selectedInfo,
        handleClick,
        closeModal,
    };
};

export default useInfoModal;
