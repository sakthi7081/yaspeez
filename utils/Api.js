import Axios from "axios";

const Api = Axios.create({
    baseURL: 'http://vinodhwebapp.azurewebsites.net/',
    timeout: 10000,
});

export default Api;
