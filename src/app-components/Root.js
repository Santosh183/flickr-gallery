import { useState, createContext } from 'react';
import { HashRouter } from 'react-router-dom';
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
            <div className={`theme theme-${appConfig.theme}`}>
                <HashRouter>
                    {router}
                </HashRouter>
            </div>
        </AppConfig.Provider >

    );
}

export default Root;
