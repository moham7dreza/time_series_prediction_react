import logo from './logo.svg';
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
import {useState} from "react";
import axios from "axios";

function App() {
    const [predict, setPredict] = useState({})
    const nav = useNavigate()

    const [date, setDate] = useState({
        startDate: new Date('2017-11-06').toISOString().split('T')[0],
        endDate: new Date('2022-12-06').toISOString().split('T')[0]
    });

    const handleDateChange = (newValue) => {
        // console.log("newValue:", newValue);
        setDate(newValue);
    }

    const submit = async (values) => {
        const data = {...values, ...date}
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
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Response from Flask API:', responseData);
            nav('/search')
        } catch (error) {
            console.error('Error sending data to Flask API:', error);
        }
    }
    const context = {
        predict, submit, date, handleDateChange
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
                    <Route path={'/load-datasets'} element={<StockChart/>}/>
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
