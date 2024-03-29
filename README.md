# React Front-End App

Welcome to the React Front-End App associated with the Flask API. This front-end application provides a user interface to interact with the Flask API.

![Welcome](./public/images/results/main.png)

![form](./public/images/results/prediction-form.png)

![results](./public/images/results/predictions.png)

![metrics](./public/images/results/metrics.png)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Python Flask API Integration](#python-flask-api-integration)
- [Technologies Used](#technologies-used)
- [Application Structure](#application-structure)
- [Issues and Questions](#issues-and-questions)

## Prerequisites

Before getting started, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/)

## Setup

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/moham7dreza/time_series_prediction_react
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd time_series_prediction_react
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

## Running the Project

1. Ensure that your Flask API server is running. If not, follow the steps in the [API App README](link-to-api-readme.md) to start the Flask API.

2. In the React front-end project directory, run the following command to start the development server:

    ```bash
    npm start
    ```

3. Access the React front-end application at [http://localhost:3000](http://localhost:3000) in your web browser.

That's it! You should now have both the Flask API and React Front-End running seamlessly with an organized project structure. If you encounter any issues, please check your configurations and ensure that all prerequisites are correctly installed.

Enjoy building with React!

## Deployment

To deploy the React app, you can build the production-ready bundle using:

```bash
cd time_series_prediction_react
npm run build
```

This will create an optimized build in the build directory that you can deploy to a web server.

## Python Flask API Integration

The React front-end communicates with a Python Flask API to fetch and send data. Below are details about the API
integration:

### GitHub Repository

The Python Flask API is hosted on GitHub. You can find the repository at:

- **Repository:
  ** [https://github.com/moham7dreza/time_series_prediction_flask_api](https://github.com/moham7dreza/time_series_prediction_flask_api)

### Explanation

The API provides various endpoints for retrieving data, performing actions, and interacting with the back-end database.
Make sure the Flask API is running and accessible from the React front-end.

### Redirection

In your React components or services where API calls are made, ensure that you use the correct API base URL for
redirection. You may define the API base URL in a configuration file or environment variable for easy management.

Here's an example of how to structure your API calls using the `axios` library in a service file:

```javascript
// src/services/apiService.js

import axios from 'axios';

const API_BASE_URL = 'https://your-flask-api-url.com';

const apiService = axios.create({
   baseURL: API_BASE_URL,
});

export default apiService;
```

## Technologies Used

The React front-end utilizes various technologies to enhance the development and user experience. Here are some key
technologies integrated into the project:

### Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is used for styling and design. It is a utility-first CSS framework that
provides low-level utility classes to build designs directly in your markup.

### Chart.js

[Chart.js](https://www.chartjs.org/) is employed for creating interactive and visually appealing charts. It's a simple
yet flexible JavaScript charting library that allows you to easily embed dynamic charts into your React components.

Feel free to explore these technologies and their documentation to leverage their capabilities in your project.

## Application Structure

The React front-end project is organized with the following structure:

- `src/components`: Contains React components responsible for rendering UI elements.
- `src/services`: Manages API calls and communication with the Flask API.
- `src/config`: Holds configuration files for the application.
- `src/contexts`: Contains React context providers for managing global state.
- `src/helpers`: Houses utility functions and helper modules.
- `src/validation`: Contains validation logic and validation-related components.
- `src/customHooks`: Includes custom React hooks for reusable logic.

Feel free to explore each directory to understand its purpose and extend the application structure based on your requirements.

### Components

The `src/components` directory is where you'll find React components responsible for rendering UI elements. Each component is designed to be modular, promoting reusability and maintainability.

### Services

The `src/services` directory manages API calls and communication with the Flask API. You'll find modules that encapsulate logic for interacting with different API endpoints.

### Config

The `src/config` directory holds configuration files for the application. This can include settings, environment variables, or any configuration needed across the application.

### Contexts

The `src/contexts` directory contains React context providers. These providers manage global state that can be shared across multiple components.

### Helpers

The `src/helpers` directory houses utility functions and helper modules. These functions can be used across the application for common tasks or calculations.

### Validation

The `src/validation` directory contains validation logic and validation-related components. This is where you can centralize form validation or any data validation needed in your application.

### Custom Hooks

The `src/customHooks` directory includes custom React hooks for reusable logic. These hooks can encapsulate complex logic and be shared among different components.

Feel free to customize and extend each directory based on your project's specific needs. This organized structure aims to enhance code maintainability, scalability, and collaboration within your React front-end project.

## Issues and Questions

If you encounter any issues or have questions, please check the documentation or open an issue on the respective GitHub
repositories:

- please visit the [React GitHub Repository](https://github.com/moham7dreza/time_series_prediction_react).
- please visit
  the [Python Flask API GitHub Repository](https://github.com/moham7dreza/time_series_prediction_flask_api).