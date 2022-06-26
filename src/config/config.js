import axios from "axios";
const {VITE_APP_BACKEND_URL} = import.meta.env
const clientsAxios = axios.create({
    baseURL :  `${VITE_APP_BACKEND_URL}`
})


export default clientsAxios;