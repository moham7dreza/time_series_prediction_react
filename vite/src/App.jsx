import './App.css';
import Header from "./components/Header";
import StockChart from "./components/StockChart";
import {Footer} from "./components/Footer";
import {Route, Routes, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {PredictionPropsForm} from "./components/PredictionPropsForm";
import {Search} from "./components/Search";
import {Dashboard} from "./components/Dashboard";
import {IconSection} from "./components/IconSection";
import {StockContext} from "./context/StockContext";
import {useEffect, useState} from "react";
import {transformObject} from "./helpers/Transformers";
import StockResultChart from "./components/StockResultChart";
import {DatasetPropsForm} from "./components/DatasetPropsForm";
import {Helmet, HelmetProvider} from 'react-helmet-async';
import config from "./config/app.js";

function App() {
    const [predicts, setPredicts] = useState({})
    const [loading, setLoading] = useState(false)
    const [models, setModels] = useState([])
    const [datasets, setDatasets] = useState([])
    const [series, setSeries] = useState([])
    const [prices, setPrices] = useState([])
    const [stockData, setStockData] = useState([]);
    const [lastPredProps, setLastPredProps] = useState([]);
    const [metrics, setMetrics] = useState([]);
    const [metricsData, setMetricsData] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const nav = useNavigate()

    const [date, setDate] = useState({
        startDate: new Date('2014-01-07').toISOString().split('T')[0],
        endDate: new Date('2022-05-16').toISOString().split('T')[0]
    });

    useEffect(() => {
        console.log(config)
        const body = document.body;
        if (isDarkMode) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleDateChange = (newValue) => {
        // console.log("newValue:", newValue);
        setDate(newValue);
    }

    const submitPredictions = async (values) => {
        setLoading(true)
        const data = transformObject({...values, ...date})
        // console.log(data)
        const apiUrl = config.api + 'make-prediction';
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add other headers if needed
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                setLoading(false)
                toast.error('i dont receive response from server')
                // throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            // console.log('Response from Flask API:', responseData);
            setLoading(false)

            const predictions = Object.entries(responseData.data)
            setPredicts(predictions)
            toast.success('Predictions Received Successfully')

            const metrics = Object.entries(responseData.metrics)
            setMetricsData(metrics)
            toast.info('Metrics Received Successfully')

            nav('/predicts')
        } catch (error) {
            setLoading(false)
            toast.error('Error sending data to Flask API');
            console.error('Error sending data to Flask API:', error);
        }
    }
    const submitDatasets = async (values) => {
        setLoading(true)
        const data = transformObject({...values, ...date})
        // console.log(data)
        const apiUrl = config.api + 'datasets';
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add other headers if needed
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                setLoading(false)
                toast.error('i dont receive response from server')
                // throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            // console.log('Response from Flask API:', responseData);
            setLoading(false)
            const datasets = Object.entries(responseData.data)
            setStockData(datasets)
            toast.success('datasets received successfully')
            nav('/load-datasets')
        } catch (error) {
            setLoading(false)
            toast.error('Error sending data to Flask API');
            console.error('Error sending data to Flask API:', error);
        }
    }
    const context = {
        predicts, submitPredictions, date, handleDateChange, loading, setLoading, models,
        setModels, submitDatasets, stockData, lastPredProps, setLastPredProps,
        datasets, metrics, setMetrics, metricsData,
        setDatasets, isDarkMode, setIsDarkMode,
        series,
        setSeries, prices, setPrices
    }
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Stock</title>
                </Helmet>
                <StockContext.Provider value={context}>
                    <ToastContainer theme={isDarkMode ? 'dark' : 'light'} position={'top-left'} draggable/>
                    <div className="h-full">
                        <div className="dark:bg-slate-900 flex h-full">
                            <div className="max-w-[80rem] flex flex-col mx-auto w-full h-full">
                                {/*<!-- ========== HEADER ========== -->*/}
                                <Header/>
                                {/*<!-- ========== END HEADER ========== -->*/}

                                {/*<!-- ========== MAIN CONTENT ========== -->*/}
                                <main id="content" role="main">
                                    <Routes>
                                        <Route path={'/'} element={<Search/>}/>
                                        <Route path={'/dashboard'} element={<Dashboard/>}/>
                                        <Route path={'/search'} element={<Search/>}/>
                                        <Route path={'/prediction-props'} element={<PredictionPropsForm/>}/>
                                        <Route path={'/dataset-props'} element={<DatasetPropsForm/>}/>
                                        <Route path={'/load-datasets'} element={<StockChart/>}/>
                                        <Route path={'/predicts'} element={<StockResultChart/>}/>
                                    </Routes>
                                </main>
                                {/*<!-- ========== END MAIN CONTENT ========== -->*/}

                                {/*<!-- ========== FOOTER ========== -->*/}
                                <IconSection/>
                                <Footer/>
                                {/*<!-- ========== END FOOTER ========== -->*/}
                            </div>
                        </div>
                    </div>
                </StockContext.Provider>
            </HelmetProvider>
        </>
    );
}

export default App;
