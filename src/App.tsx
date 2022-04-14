import React from 'react';
import './App.css';
import Login from "./auth/login";
import {Provider} from "@dhis2/app-runtime";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Home from "./home";

const config = {
    baseUrl: process.env.REACT_APP_DHIS2_BASE_URL ?? "http://localhost:8080",
    apiVersion: 37
}


function App() {
    return (
        <Provider config={config}>
            <Router>
                <Routes>
                    <Route element={<Login/>} path="/"/>
                    <Route element={<Home/>} path="/home"/>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
