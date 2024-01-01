import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {ErrorBoundary} from "react-error-boundary";

const root = ReactDOM.createRoot(document.getElementById('root'));

function fallbackRender({error, resetErrorBoundary}) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{color: "red"}}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Reset Error Boundary</button>
        </div>
    );
}


root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ErrorBoundary fallbackRender={fallbackRender}
                           onReset={(details) => {
                               // Reset the state of your app so the error doesn't happen again
                           }}>
                <App/>
            </ErrorBoundary>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
