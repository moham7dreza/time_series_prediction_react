// StockChart.js

import React, {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import {toast} from "react-toastify";

const StockChart = () => {
    const [stockData, setStockData] = useState([]);
    const chartRefs = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace 'YOUR_API_KEY' and 'YOUR_STOCK_SYMBOL' with actual values
                // const apiKey = 'YOUR_API_KEY';
                // const stockSymbol = 'YOUR_STOCK_SYMBOL';
                // const apiUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${stockSymbol}?apikey=${apiKey}`;
                const apiUrl = 'http://127.0.0.1:5000/datasets'
                const response = await fetch(apiUrl);
                const result = await response.json();
                if (result.status === 'OK') {
                    toast.success('Data loaded successfully')
                    const data = Object.entries(result.data)
                    // console.log(data.map(data => console.log(data[0])));
                    // Assuming the API response has a structure like { historical: [] }
                    setStockData(data);
                }
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchData();
    }, []);

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
            const data = Object.values(dataset[1])
            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map((data) => {
                        // console.log(data)
                        // Format the date to show only the date without the time
                        return new Date(data.date).toISOString().split('T')[0];
                    }),
                    datasets: [
                        {
                            label: `${title} Stock Price`,
                            data: data.map((data) => data.close),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                },
                // options: {
                //     scales: {
                //         x: {
                //             type: 'linear',
                //             position: 'bottom',
                //         },
                //     },
                // },
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
        });
    };

    return (
        <div>
            {
                stockData.map((dataset, index) => (
                    <section>
                        {/* Card Blog */
                        }
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            {/* Grid */}
                            <div className="grid lg:grid-cols-1 gap-6">
                                {/* Card */}
                                <a className="group relative block rounded-xl dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                   href="#">
                                    <div key={index}>
                                        <span className={'flex items-center justify-center'}>{ `${dataset[0]} close prices` }</span>
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
