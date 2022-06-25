import axios from "axios";

const clientsAxios = axios.create({
    baseURL :  import.meta.env.VITE_APP_BACKEND_URL
})


export default clientsAxios;