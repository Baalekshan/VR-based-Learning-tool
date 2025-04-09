import { config } from '../config';

const response = await axios.get<User>(`${config.apiBaseUrl}/current-user`, {
  // ... existing code ...
}); 