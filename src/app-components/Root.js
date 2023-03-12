import { HashRouter } from 'react-router-dom';
import router from '../routing/routing-config';
import { useSelector } from 'react-redux/es/exports';


function Root() {


    const theme = useSelector(state => state.theme);

    return (

        <div className={`theme theme-${theme}`}>
            <HashRouter>
                {router}
            </HashRouter>
        </div>


    );
}

export default Root;
