// const dotenv = require('dotenv');

// Load environment variables from .env file
// dotenv.config();

const config = {
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    apiUrl: import.meta.env.VITE_REACT_APP_API_URL,
    jsonServerUrl: import.meta.env.VITE_JSON_SERVER_URL,
    api: import.meta.env.VITE_FLASK_APP_API_URL,
};

export default config;
