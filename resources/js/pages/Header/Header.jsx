import { NavLink } from "../NavLink";

const Header = () => {
    return(
        <div>
            <NavLink
            href={'/'}>
                Home
            </NavLink>
            <NavLink
            href={'/Form'}>
                Form
            </NavLink>
            <NavLink
            href={'/UserData'}>
                Data
            </NavLink>
        </div>
    );
}

export default Header
