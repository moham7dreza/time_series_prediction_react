// StockChart.js

import React, {useContext, useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {StockContext} from "../context/StockContext";
import {Spinner} from "./Spinner";

const ResultCharts = () => {
    const chartRefs = useRef(null);

    const {setLoading, loading, predicts, datasets, series, models, prices} = useContext(StockContext)

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

    // Function to generate random color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const renderCharts = () => {
        // Clear existing charts
        chartRefs.current.forEach((chart) => {
            if (chart) {
                chart.destroy();
            }
        });

        // Render new charts
        Object.keys(predicts).forEach((dataset) => {
            const datasetData = predicts[dataset];
            // console.log(datasetData)
            Object.keys(datasetData).forEach((serie) => {
                const serieData = datasetData[serie];
                // console.log(serieData)
                if (serieData) {
                    Object.keys(serieData).forEach((model) => {
                        const modelData = serieData[model]
                        // console.log(modelData)
                        if (modelData) {
                            Object.keys(modelData).forEach((priceType) => {
                                const priceData = modelData[priceType]
                                // console.log(priceData)
                                if (priceData) {
                                    const ctx = document.getElementById(
                                        `${dataset}-${serie}-${model}-${priceType}-chart`
                                    );

                                    const seriesData = serieData[model][priceType];
                                    console.log(seriesData)
                                    const seriesLabels = Object.values(seriesData).map((entry) => new Date(entry.date).toISOString().split('T')[0]);

                                    const chart = new Chart(ctx, {
                                        type: 'line',
                                        data: {
                                            labels: seriesLabels,
                                            datasets: [{
                                                label: `${dataset} ${serie} - ${model} - ${priceType}`,
                                                data: Object.values(seriesData).map(data => data.actual),
                                                fill: false,
                                                borderColor: getRandomColor(),
                                            }],
                                        },
                                        options: {
                                            animation: false,
                                            plugins: {
                                                legend: {
                                                    display: false
                                                },
                                                tooltip: {
                                                    enabled: false
                                                }
                                            }
                                        },
                                    });
                                    chartRefs.current.push(chart)
                                }
                                // console.log('passed')
                            });
                        }

                    });
                }
            });
        });

    };

    return (
        <div>
            {/* Render chart canvases for each dataset, prediction type, model, and price type */}
            {loading ? <Spinner/> : Object.keys(predicts).map((dataset) => {
                const datasetData = predicts[dataset];

                return datasetData ?
                    Object.keys(datasetData).map((serie) => {
                        const serieData = datasetData[serie];

                        return serieData
                            ? Object.keys(serieData).map((model) => {
                                const modelData = serieData[model];

                                return modelData
                                    ? Object.keys(modelData).map((priceType) => {
                                        const priceData = modelData[priceType];

                                        return priceData
                                            ? (
                                                <section>
                                                    {/* Card Blog */
                                                    }
                                                    <div
                                                        className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                                                        {/* Grid */}
                                                        <div className="grid lg:grid-cols-1 gap-6">
                                                            {/* Card */}
                                                            <a className="group relative block rounded-xl dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                            >
                                                                <div>
                                        <span
                                            className={'flex items-center justify-center'}>{`${dataset}-${serie}-${model}-${priceType}-chart`}</span>
                                                                    <canvas
                                                                        key={`${dataset}-${serie}-${model}-${priceType}-chart`}
                                                                        id={`${dataset}-${serie}-${model}-${priceType}-chart`}
                                                                        width="400"
                                                                        height="200"
                                                                    />
                                                                </div>
                                                            </a>
                                                            {/* End Card */}
                                                        </div>
                                                        {/* End Grid */}
                                                    </div>
                                                    {/* End Card Blog */
                                                    }
                                                </section>
                                            ) : null;
                                    }) : null
                            }) : null;
                    }) : null
            })}
        </div>
    );
};

export default ResultCharts;
