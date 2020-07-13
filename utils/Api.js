import Axios from "axios";

const Api = Axios.create({
    baseURL: 'http://vinodhwebapp.azurewebsites.net/yusers/',
    timeout: 10000,
});

export default Api;