import axios from "axios";

const todoFetch = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default todoFetch;
