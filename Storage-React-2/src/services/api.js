import axios from "axios"

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

export const changeStatus = async (id, data) => {
    try {
      return await apiClient.get(`/changeStatus/${id}`, { params: data });
    } catch (err) {
      return {
        error: true,
        err
      };
    }
  };
  
  export const updateTask = async (id, data) => {
    try {
      return await apiClient.put(`/update/${id}`, data);
    } catch (err) {
      return {
        error: true,
        err
      };
    }
  };
  
  export const deleteTask = async (id) => {
    try {
      return await apiClient.delete(`/delete/${id}`);
    } catch (err) {
      return {
        error: true,
        err
      };
    }
  };
  
  export const getTasks = async () => {
    try {
      return await apiClient.get('/getTasks');
    } catch (err) {
      return {
        error: true,
        err
      };
    }
  };