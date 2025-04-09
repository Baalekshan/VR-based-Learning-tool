import { config } from '../config';

const response = await axios.get(`${config.apiBaseUrl}/profile`); 