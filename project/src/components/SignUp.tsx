import { config } from '../config';

const handleGoogleSignUp = () => {
  window.location.assign(`${config.apiBaseUrl}/auth/google`);
};

const response = await axios.post(`${config.apiBaseUrl}/signup`, {
  name,
  email,
  password,
}); 