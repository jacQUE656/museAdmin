import axios from "axios";


// create axiios instant
const API_BASE_URL = "http://localhost:2011";
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// A\Request interceptor to add token

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

//RESPONSE INTERCEPTORS TO HANDLE AUTH ERRORS GLOBALLY
apiClient.interceptors.response.use(
    response => response, error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/login';

        }
        return Promise.reject(error);
    }
)
export const songsAPI = {
    add: (formData) =>{
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            },
        };
       return apiClient.post('/api/songs' , formData, config);
    }, 
    list: ()=> apiClient.get('/api/songs'),
    remove:(id) => apiClient.delete(`/api/songs/${id}`)
}

export const albumsAPI = {
    add: (formData) =>{
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            },
        };
       return apiClient.post('/api/albums' , formData, config);
    }, 
    list: ()=> apiClient.get('/api/albums'),
    remove:(id) => apiClient.delete(`/api/albums/${id}`)
}
export const userAPI = {
    add: ()=> apiClient.post('/api/user'),
    list: ()=> apiClient.get('/api/user'),
    delete:(id) => apiClient.delete(`/api/user/${id}`)
}



export default apiClient;
