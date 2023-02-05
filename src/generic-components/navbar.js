import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from "react";
import { AppConfig } from '../app-components/Root'
import '../component-styles/navbar.css';

function NavBar() {
    const [active, setActive] = useState(false);
    const toggleMenu = () => setActive(!active);
    const { appConfig, changeConfig } = useContext(AppConfig);

    const changeMode = (mode) => {
        toggleMenu();
        changeConfig({ theme: mode });
    }

    return (
        <>
            <h2 className="header">Flicker Photo Gallery</h2>
            <div onClick={() => toggleMenu()} className={active ? 'menu active' : 'menu'}>
                <FontAwesomeIcon icon={active ? faTimes : faBars} />
            </div>
            <ul className={active ? 'navbar active' : 'navbar'}>
                <li>
                    <NavLink
                        onClick={() => toggleMenu()}
                        to='tagged-photos'

                    > Tagged Photos
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        onClick={() => toggleMenu()}
                        to='recent-photos'
                    > Recent
                    </NavLink>
                </li>
                <li>
                    <div className="mode">
                        Mode:
                        <select onChange={(e) => changeMode(e.target.value)} value={appConfig.theme}>
                            <option value="">--select--</option>
                            <option value="light">light</option>
                            <option value="dark">dark</option>
                            <option value="auto">auto</option>
                        </select>
                    </div>
                </li>
            </ul>
        </>
    );
}

export default NavBar;
