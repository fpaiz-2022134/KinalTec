import { useState } from "react";

import { getTasksRequest } from "../services/api";

export const useGetTasks =()=>{
    const [posts, setPosts] =useState(null)

    const getTasks = async () => {
        const response = await getTasksRequest();
        if (response.error) {
            alert(
                response.err.response.data.message ||
                'Error al obtener los posts.'
            )
        }
        
        
        setPosts(response.data);
    };

    return {
        posts,
        isFetching: !posts,
        getTasks
    }
}
