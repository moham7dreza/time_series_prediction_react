import '../App.css'
import logo from '../logo.svg';

export const Spinner = () => {
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className={'text-2xl text-gray-400 font-bold capitalize mt-10'}>Data is begin to fetching from
                        API application ...</h1>
                </header>
            </div>
        </>
    )
}