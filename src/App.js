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

function App() {
    const [predict, setPredict] = useState({})
    const nav = useNavigate()
     const submit = async (values) => {
        console.log(values)
        try {


            // if (status === 201) {
            //     toast.success("User created successfully")
            //
            // }
            nav('/search')
        } catch (e) {
            console.log(e.message)
        }
    }
    const context = {
        predict, submit
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
