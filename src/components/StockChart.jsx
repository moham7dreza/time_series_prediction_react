// StockChart.js

import React, {useContext, useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {Helmet} from "react-helmet-async";
import {StockContext} from "../context/StockContext";

const StockChart = () => {
    const {stockData} = useContext(StockContext)

    const chartRefs = useRef(null);

    useEffect(() => {
        // Initialize chartRefs.current as an empty array
        chartRefs.current = [];
        // Render charts when the datasets change
        renderCharts();

        // Cleanup the charts when the component unmounts
        return () => {
            chartRefs.current.forEach((chart) => {
                if (chart) {
                    chart.destroy();
                }
            });
        };
    }, [stockData]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const createChartDataset = (title, data, labelSuffix = '') => {
        return {
            label: `${title} ${labelSuffix}`,
            data: data,
            borderColor: getRandomColor(),
            borderWidth: 2,
            fill: false,
        };
    }

    const renderCharts = () => {
        // Clear existing charts
        chartRefs.current.forEach((chart) => {
            if (chart) {
                chart.destroy();
            }
        });

        // Render new charts
        chartRefs.current = stockData.map((dataset, index) => {
            // console.log(Object.values(dataset[1]))
            const ctx = document.getElementById(`stockChart-${index}`).getContext('2d');
            const title = dataset[0]
            const labels = dataset[1].labels.map((date) => {
                // console.log(data)
                // Format the date to show only the date without the time
                return new Date(date).toISOString().split('T')[0];
            })
            const datasets = Object.keys(dataset[1].datasets).map(datasetTitle => (
                createChartDataset(datasetTitle, dataset[1].datasets[datasetTitle], 'Price')
            ))
            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [...datasets]
                },
                options: {
                    animation: true,
                    responsive: true,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            enabled: true,
                            mode: 'index'
                        },
                        datalabels: {
                            display: true
                        },
                        title: {
                            display: false,
                            text: 'My Chart Title',
                            // other options...
                        },
                    },
                },
            });
        });
    };

    return (
        <div>
            <Helmet>
                <title>Datasets</title>
            </Helmet>
            {
                stockData.map((dataset, index) => (
                    <section className={'px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto rounded-2xl shadow-2xl mt-5 text-gray-800 dark:text-gray-300 dark:hover:text-white'}>
                        {/* Card Blog */
                        }
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            {/* Grid */}
                            <div className="grid lg:grid-cols-1 gap-6">
                                {/* Card */}
                                <a className="group relative block rounded-xl dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                    <div key={index}>
                                        <span
                                            className={'flex items-center justify-center mb-8 text-3xl font-bold dark:text-gray-500'}>{`${dataset[0]} Dataset Price`}</span>
                                        <canvas id={`stockChart-${index}`} width="400" height="200"></canvas>
                                    </div>
                                </a>
                                {/* End Card */}
                            </div>
                            {/* End Grid */}
                        </div>
                        {/* End Card Blog */
                        }
                    </section>
                ))
            }
        </div>
    );
};

export default StockChart;
