// StockChart.js

import React, {useContext, useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {StockContext} from "../context/StockContext";
import {Helmet} from "react-helmet";

const StockChart = () => {
    const {setLoading, loading, predicts, datasets, series, models, prices, metricsData} = useContext(StockContext)
    const chartRefs = useRef(null);
    const metricsChartRefs = useRef(null);


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
    }, [predicts]);

    useEffect(() => {
        // Initialize chartRefs.current as an empty array
        metricsChartRefs.current = [];
        // Render charts when the datasets change
        metricsRenderCharts();

        // Cleanup the charts when the component unmounts
        return () => {
            metricsChartRefs.current.forEach((chart) => {
                if (chart) {
                    chart.destroy();
                }
            });
        };
    }, [metricsData]);

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
        chartRefs.current = predicts.map((dataset, index) => {

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
            const actuals = [createChartDataset('Actual Price', dataset[1].actuals)];

            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [...datasets, ...actuals],
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
                        datalabels:{
                            display: true
                        },
                        title: {
                            display: false,
                            text: 'My Chart Title',
                            // other options...
                        },
                    },
                    // scales: {
                    //     x: {
                    //         display: true,
                    //         title: {
                    //             display: true,
                    //             text: 'Month'
                    //         }
                    //     },
                    //     y: {
                    //         display: true,
                    //         title: {
                    //             display: true,
                    //             text: 'Value'
                    //         }
                    //     }
                    // }
                },
            });
        });
    };

    const metricsRenderCharts = () => {
        // Clear existing charts
        metricsChartRefs.current.forEach((chart) => {
            if (chart) {
                chart.destroy();
            }
        });

        // Render new charts
        metricsChartRefs.current = metricsData.map((dataset, index) => {

            const ctx = document.getElementById(`metricsChart-${index}`).getContext('2d');

            return new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dataset[1].labels,
                    datasets: [createChartDataset('Metric', dataset[1].dataset)],
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
                        datalabels:{
                            display: true
                        },
                        title: {
                            display: false,
                            text: 'My Chart Title',
                            // other options...
                        },
                    },
                    // scales: {
                    //     x: {
                    //         display: true,
                    //         title: {
                    //             display: true,
                    //             text: 'Month'
                    //         }
                    //     },
                    //     y: {
                    //         display: true,
                    //         title: {
                    //             display: true,
                    //             text: 'Value'
                    //         }
                    //     }
                    // }
                },
            });
        });
    };

    return (
        <div>
            <Helmet>
                <title>Results</title>
            </Helmet>
            {
                predicts.map((dataset, index) => (
                    <section>
                        {/* Card Blog */
                        }
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            {/* Grid */}
                            <div className="grid lg:grid-cols-1 gap-6">
                                {/* Card */}
                                <a className="group relative block rounded-xl dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                    <div key={index}>
                                        <h1
                                            className={'flex items-center justify-center text-slate-500 mb-8 text-3xl font-bold'}>{`${dataset[0]} Prices`}</h1>
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
            {
                metricsData.map((dataset, index) => (
                    <section>
                        {/* Card Blog */
                        }
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            {/* Grid */}
                            <div className="grid lg:grid-cols-1 gap-6">
                                {/* Card */}
                                <a className="group relative block rounded-xl dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                    <div key={index}>
                                        <h1
                                            className={'flex items-center justify-center text-slate-500 mb-8 text-3xl font-bold'}>{`${dataset[0]} Metrics`}</h1>
                                        <canvas id={`metricsChart-${index}`} width="400" height="200"></canvas>
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
