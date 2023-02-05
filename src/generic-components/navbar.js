import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

function NavBar() {
    const [active, setActive] = useState(false);
    const toggleMenu = () => setActive(!active);
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
            </ul>
        </>
    );
}

export default NavBar;
