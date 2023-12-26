const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    apiUrl: process.env.REACT_APP_API_URL,
    jsonServerUrl: process.env.JSON_SERVER_URL,
};

export default config;
