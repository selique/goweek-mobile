// dependencia - requisições http
import axios from 'axios';

// emulador padrao android studio- 10.0.2.2:3000
// emulador genymotion 10.0.3.2:3000
const api = axios.create({
    baseURL: 'http://10.0.3.2:3000',
});

export default api;