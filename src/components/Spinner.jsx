import '../App.css'
import logo from '../logo.svg';

export const Spinner = () => {
    return (
        <>
            <div className="App">
                <header className="App-header bg-white dark:bg-slate-900 dark:text-gray-400">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className={'text-2xl font-bold capitalize mt-10'}>Data is begin to fetching from
                        API application ...</h1>
                </header>
            </div>
        </>
    )
}