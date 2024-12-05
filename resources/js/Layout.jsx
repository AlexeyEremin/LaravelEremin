import { BrowserRouter } from 'react-router-dom';
import Header from "./pages/Header/Header";
import PropTypes from 'prop-types';
import React from 'react';

export function Layout({ children }) {
    return (
        <BrowserRouter>
            <Header />
            <div style={{ padding: "0" }}>{children}</div>
        </BrowserRouter>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
