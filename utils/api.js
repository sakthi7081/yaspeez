import Axios from 'axios';

export default Axios.create({
  baseUrl: 'http://vinodhwebapp.azurewebsites.net/',
  timeout: 10000
});
