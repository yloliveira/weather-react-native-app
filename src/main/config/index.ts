import config from 'react-native-config';

const env = {
  ENV: config.ENV,
  OPEN_WEATHER_API_URL: config.OPEN_WEATHER_API_URL,
  OPEN_WEATHER_API_KEY: config.OPEN_WEATHER_API_KEY,
};

export default {
  env,
};
