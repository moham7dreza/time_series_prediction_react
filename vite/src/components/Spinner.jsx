import '../App.css'
import logo from '../assets/logo.svg';

export const Spinner = () => {
    return (
        <>
            <div className="App">
                <header className="bg-white App-header dark:bg-slate-900 dark:text-gray-400">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className={'text-2xl font-bold capitalize mt-10'}>Data is begin to fetching from
                        API application ...</h1>
                </header>
            </div>
        </>
    )
}