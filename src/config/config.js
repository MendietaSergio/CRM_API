import axios from "axios";

const clientsAxios = axios.create({
    baseURL : 'http://localhost:5000'
})


export default clientsAxios;