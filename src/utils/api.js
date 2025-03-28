import axios from "axios";

const API_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });

        return response.data;
    }
    catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

// export const fetchTasks = async () => {
//     try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${API_URL}/tasks`, {
//             headers: { Authorization: `Bearer ${token}`},
//         });
//         return response.data;
//     }
//     catch (error) {
//         console.error("Error fetching tasks", error);
//         throw error;
//     }
// };

export const fetchTasks = async () => {
    try {
        const tasks = [
            { id: 1, title: "Task 1", completed: false },
            { id: 2, title: "Task 2", completed: true },
        ]; // Mock Data
        return tasks;
    } 
    catch (error) {
        console.error("Error fetching tasks", error);
        throw error;
    }
};


export const createTask = async (taskData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/tasks`, taskData, {
            headers: { Authorization: `Bearer ${token}`},
        });
        return response.data;
    }
    catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const updateTask = async (taskId, updatedData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/tasks/${taskId}`, updatedData, {
            headers: { Authorization: `Bearer ${token}`},
        });
        return response.data;
    }
    catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
      }
};

export const toggleTaskCompletion = async (taskId, isCompleted) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(
            `${API_URL}/tasks/${taskId}`,
            { completed: isCompleted},
            { headers: {Authorization: `Bearer ${token}`}}
        );
        return response.data;
    }
    catch (error) {
        console.error("Error toggling task completion:", error);
        throw error;
    }
};



