import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

export default function FinalizeFinance () {
    const location = useLocation();
    const { financeTerms, userData, carInfos } = location.state;
    console.log(financeTerms);
    console.log(userData);
    console.log(carInfos);
    <div>
        
    </div>
}