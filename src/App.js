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
import ResultCharts from "./components/ResultCharts";
import ResultCharts2 from "./components/ResultCharts2";
import StockResultChart from "./components/StockResultChart";
import {DatasetPropsForm} from "./components/DatasetPropsForm";

function App() {
    const [predicts, setPredicts] = useState({})
    const [loading, setLoading] = useState(false)
    const [models, setModels] = useState([])
    const [datasets, setDatasets] = useState([])
    const [series, setSeries] = useState([])
    const [prices, setPrices] = useState([])
    const [stockData, setStockData] = useState([]);
    const [lastPredProps, setLastPredProps] = useState([]);

    const nav = useNavigate()

    const [date, setDate] = useState({
        startDate: new Date('2017-11-06').toISOString().split('T')[0],
        endDate: new Date('2022-12-06').toISOString().split('T')[0]
    });

    const handleDateChange = (newValue) => {
        // console.log("newValue:", newValue);
        setDate(newValue);
    }

    const submitPredictions = async (values) => {
        setLoading(true)
        const data = transformObject({...values, ...date})
        // console.log(data)
        const apiUrl = 'http://127.0.0.1:5000/make-prediction';
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
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            // console.log('Response from Flask API:', responseData);
            setLoading(false)
            const predictions = Object.entries(responseData.data)
            setPredicts(predictions)
            toast.success('predictions received successfully')
            nav('/predicts')
        } catch (error) {
            setLoading(false)
            console.error('Error sending data to Flask API:', error);
        }
    }
    const submitDatasets = async (values) => {
        setLoading(true)
        const data = transformObject({...values, ...date})
        // console.log(data)
        const apiUrl = 'http://127.0.0.1:5000/datasets';
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
                throw new Error('Network response was not ok');
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
            console.error('Error sending data to Flask API:', error);
        }
    }
    const context = {
        predicts, submitPredictions, date, handleDateChange, loading, setLoading, models,
        setModels, submitDatasets, stockData, lastPredProps, setLastPredProps,
        datasets,
        setDatasets,
        series,
        setSeries, prices, setPrices
    }
    return (
        <>
            <StockContext.Provider value={context}>
                <ToastContainer/>
                <Header/>

                <Routes>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/search'} element={<Search/>}/>
                    <Route path={'/prediction-props'} element={<PredictionPropsForm/>}/>
                    <Route path={'/dataset-props'} element={<DatasetPropsForm/>}/>
                    <Route path={'/load-datasets'} element={<StockChart/>}/>
                    <Route path={'/predicts'} element={<StockResultChart/>}/>
                </Routes>
                {/*<div className="App">*/}
                {/*    <header className="w-60 h-60 flex items-center justify-center">*/}
                {/*        <img src={logo} className="App-logo" alt="logo"/>*/}
                {/*    </header>*/}
                {/*</div>*/}
                <IconSection/>
                <Footer/>
            </StockContext.Provider>
        </>
    );
}

export default App;
