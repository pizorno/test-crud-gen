import axios, { Axios } from "axios";

export const AxiosProvider = axios.create({
    baseURL:'http://localhost:3000/notes'
})