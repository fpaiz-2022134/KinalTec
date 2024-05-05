import axios from "axios";

//Configuraciones base
const apiClient = axios.create({
    baseURL: 'http://localhost:2880/storageMachine',
    timeout: 5000
})




export const createTask = async (data) => {
    try {
        return await apiClient.post('/save', data)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getTasksRequest = async()=>{
    try{
        return await apiClient.get('/getTasks')
    }catch(err){
        return {
            error: true,
            err
        }
    }
}


/* export const updatePostRequest = async(id, post)=>{
    try{
        return await apiClient.put(`/post/editPost/${id}`, post)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const deletePostRequest = async(id)=>{
    try{
        return await apiClient.delete(`/post/deletePost/${id}`)
    }catch(err){
        return {
            error: true,
            err
        }
    }
} */