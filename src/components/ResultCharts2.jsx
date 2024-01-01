// StockChart.js

import React, {useContext, useEffect} from 'react';
import Chart from 'chart.js/auto';
import {StockContext} from "../context/StockContext";

const ResultCharts = () => {
    const {predicts} = useContext(StockContext)

    useEffect(() => {
        // Function to render a chart
        const renderChart = (dataset, series, model, actual, predictions) => {
            const ctx = document.getElementById(`${dataset}-${series}-${model}-chart`);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: actual.map((_, index) => index + 1),
                    datasets: [
                        {
                            label: 'Actual',
                            data: actual,
                            borderColor: 'blue',
                            fill: false,
                        },
                        {
                            label: 'Predictions',
                            data: predictions,
                            borderColor: 'red',
                            fill: false,
                        },
                    ],
                },
            });
        };

        // Iterate through the nested structure and render charts
        Object.keys(predicts).forEach((dataset) => {
            const seriesKeys = Object.keys(predicts[dataset]);

            seriesKeys.forEach((series) => {
                const models = predicts[dataset][series];

                if (models) {
                    Object.keys(models).forEach((model) => {
                        const {actual, predictions} = models[model];

                        if (actual && predictions) {
                            // Render a chart for the current dataset, series, and model
                            renderChart(dataset, series, model, actual, predictions);
                        }
                    });
                }
            });
        }, [predicts]);
    }, [])

    return (
        <div>
            {/* Container for each chart */}
            {Object.keys(predicts).map((dataset) => {
                const seriesKeys = Object.keys(predicts[dataset]);

                return seriesKeys.map((series) => {
                    const models = predicts[dataset][series];

                    if (models) {
                        return Object.keys(models).map((model) => (
                            <div key={`${dataset}-${series}-${model}`} className="chart-container">
                                <canvas
                                    id={`${dataset}-${series}-${model}-chart`}
                                    width="400"
                                    height="200"
                                ></canvas>
                            </div>
                        ));
                    }

                    return null;
                });
            })}
        </div>
    );
};

export default ResultCharts;
