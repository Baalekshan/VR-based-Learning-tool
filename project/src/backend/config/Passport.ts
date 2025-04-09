import { config } from './config';

const googleStrategyConfig = {
  callbackURL: `${config.clientBaseUrl}/api/auth/google/callback`
};

export default googleStrategyConfig; 