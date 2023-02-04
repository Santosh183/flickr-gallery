import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <ul>
            <li>
                <NavLink
                    to='tagged-photos'

                > Tagged Photos
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='recent-photos'
                > Recent
                </NavLink>
            </li>
        </ul>
    );
}

export default NavBar;
