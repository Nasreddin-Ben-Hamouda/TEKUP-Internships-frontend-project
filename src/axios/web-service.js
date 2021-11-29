
import axios from "axios";


const instance=axios.create({
    baseURL: process.env.REACT_APP_BACKEND_WEB_SERVICE || "http://localhost:8080"
});

export default instance;
