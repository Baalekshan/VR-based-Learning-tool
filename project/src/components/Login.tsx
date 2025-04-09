import { config } from '../config';

const handleGoogleLogin = () => {
  window.location.assign(`${config.apiBaseUrl}/auth/google`);
};

const response = await axios.post(`${config.apiBaseUrl}/login`, { email, password }); 