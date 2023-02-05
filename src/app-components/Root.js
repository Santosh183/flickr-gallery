import { useState, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import router from '../routing/routing-config';

export const AppConfig = createContext();


function Root() {

    const theme = localStorage.getItem('theme') || 'auto';
    const [appConfig, setAppConfig] = useState({ theme });

    function changeConfig(appConfig) {
        setAppConfig(appConfig);
        localStorage.setItem('theme', appConfig.theme);
    }
    return (
        <AppConfig.Provider value={{ appConfig, changeConfig }}>
            <BrowserRouter>
                {router}
            </BrowserRouter>
        </AppConfig.Provider>
    );
}

export default Root;
