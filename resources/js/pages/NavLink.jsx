import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const NavLink = memo(({ href, children }) => {
    const pathName = useLocation().pathname;
    const isActive = pathName.includes(href) && pathName === href
    return (
        <Link 
        to={href}
        className={isActive ? 'active' : ''}>
            {children}
        </Link>
    );
})


NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};