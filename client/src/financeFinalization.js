import React, { useState, useEffect } from "react";
import { PDFViewer } from '@react-pdf/renderer';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import FinanceAgreementPDF from './financeAgreementPDF';
import './App.css';

export default function FinalizeFinance () {
    const location = useLocation();
    const { financeTerms, userData, carInfos } = location.state;
    console.log(financeTerms);
    console.log(userData);
    console.log(carInfos);
    
    return(
        <div id="final-bg">
            <center><h1 id="final-heading">Finalize Finance</h1></center>
            <div id="pdf-holder">
                <PDFViewer width="50%" height="100%" id="viewer">
                    <FinanceAgreementPDF financeTerms={financeTerms} userData={userData} carInfos={carInfos} />
                </PDFViewer>
            </div>
            <center><p>Sign your full name below</p></center>
            <center id="sigContainer"><input id="signature" type="text" /></center>
            <center><input id="agreement" type="checkbox" required /> I Agree</center>
            <center><button id="finalize" class="blue-btn">Sign</button></center>
        </div>
    );
}