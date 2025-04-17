import React from "react";
import ResourceItem from "../ResourceItem/ResourceItem";
import { useResContext } from "../../../context/ResourcesContext/ResourceContext";

const ResourcesContainer = () => {
    const { resourceList, filterWord, setIsEditing, setSelectedResource } = useResContext();
    console.log(resourceList);

    return (
        <div className="flex flex-col bg-gray-800 w-[95%] min-h-90 max-h-120 rounded-2xl p-4 overflow-scroll">
            {resourceList.length > 0 ? ( //SI HAY ELEMENTOS EN LA LISTA
                resourceList
                .filter(
                    (resource) =>
                        (resource.nombre &&
                            resource.nombre
                                .toLowerCase()
                                .includes(filterWord.toLowerCase())) ||
                        (resource.titulo &&
                            resource.titulo
                                .toLowerCase()
                                .includes(filterWord.toLowerCase())) ||
                        (resource.asunto &&
                            resource.asunto
                                .toLowerCase()
                                .includes(filterWord.toLowerCase())) ||
                        (resource.descripcion &&
                            resource.descripcion
                                .toLowerCase()
                                .includes(filterWord.toLowerCase()))
                )                
                    .map((resource) => (
                        <ResourceItem key={resource._id} resource={resource} />
                    ))
            ) : (
                <div>Aún no has seleccionado o no hay nada que mostrar.</div>
            )}
        </div>
    );
};

export default ResourcesContainer;
