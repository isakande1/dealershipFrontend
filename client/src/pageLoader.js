import React from "react";
import './App.css';

export default function PageLoader ({ message }) {
    console.log(message);

    return (
        <div id="spinner-container">
            <div class="spinner">
                <div class="spinner1"></div>
            </div>
            <p id="loading-message">{message}</p>
        </div>
    );
};