import React, { useState, useEffect } from "react";
import { PDFViewer } from '@react-pdf/renderer';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import FinanceAgreementPDF from './financeAgreementPDF';
import FinanceLoader from "./financeLoader";
import './App.css';

export default function FinalizeFinance () {
    const location = useLocation();
    //const { financeTerms, userData, carInfos } = location.state;
    const financeTerms = location.state?.financeTerms; 
    const userData = location.state?.userData;
    const carInfos = location.state?.carInfos;
    const navigate = useNavigate();
    console.log(financeTerms);
    console.log(userData);
    console.log(carInfos);
    const [loaderVisible, setLoaderVisible] = useState(true);
    const onLoadMessages = [
        "Sending your information...",
        "Determing affordability...",
        "Analyzing credit history...",
        "Decision Received!",
      ];

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setLoaderVisible(false);
      }, 4000);
    
      // Cleanup function to clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }, []);

    const handleBackToHome = () => {
        navigate('/homepage', { state: { userData } })
    }

    const handleSignedApp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/add_to_cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_id: userData.customer_id,
                    car_id: carInfos.car_id,
                    item_price: financeTerms.terms.down_payment,
                    item_name: `${carInfos.make} ${carInfos.model}`,
                    item_image: carInfos.image0
                }),
            });
            console.log(response)
            
            if (response.status === 200 || response.status === 201) {
                console.log('userData', userData)

                const response2 = await fetch('http://localhost:5000/saveFinanceApplication', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        email: userData.email,
                        address: userData.Address,
                        phone_number: userData.phone,
                        customer_id: userData.customer_id,
                        car_year: carInfos.year,
                        car_make: carInfos.make,
                        car_model: carInfos.model,
                        car_price: carInfos.price,
                        credit_score: financeTerms.credit_score,
                        finance_decision: financeTerms.status,
                        loan_term: financeTerms.terms.loan_term,
                        down_payment: financeTerms.terms.down_payment,
                        loan_apr: financeTerms.terms.apr,
                        loan_monthly_payment: financeTerms.terms.monthly_payment
                    }),
                });

                //console.log("Application to be saved: ", response2.body);
                if (response2.ok) {
                    const data = await response2.json();
                    console.log(data); // This should now contain the data returned by the server
                } else {
                    console.error('Error saving application:', response2.statusText);
                }

                navigate('/Addons', {
                    state: {
                        userData: userData,
                        carInfos: carInfos,
                        car_name: ` ${carInfos.make} ${carInfos.model} ${carInfos.year}`,
                        car_image: carInfos.image0,
                        car_price: financeTerms.terms.down_payment,
                        car_id: carInfos.car_id
                    },
                });
                //Take customer to cart if the car is already in his cart
            } else if(response.status === 409) {
                const confirmed = window.confirm('Car already in the cart. Checkout insead?')
                if (confirmed) {
                // Redirect to cart
                    navigate('/Cart', {
                        state: {
                            userData: userData,
                            car_name: `${carInfos.make} ${carInfos.model} ${carInfos.year}`,
                            car_image: carInfos.image0,
                            car_price: carInfos.price,
                            car_id: carInfos.car_id
                        },
                    });
                }
            } else {
                throw new Error('Error adding car');
            }
        } catch (error) {
            // Handle any errors here
            console.error(error);
            window.confirm('Car could not be added');
        }
    };
    
    if (financeTerms.status == "approved") {
        return(
            <>
                {loaderVisible && (
                    <FinanceLoader messages={onLoadMessages} />
                )}
                {!loaderVisible && (
                    <div id="final-bg">
                        <center><h1 id="final-heading">Finalize Finance</h1></center>
                        <div id="pdf-holder">
                            <PDFViewer width="50%" height="100%" id="viewer">
                                <FinanceAgreementPDF financeTerms={financeTerms} userData={userData} carInfos={carInfos} />
                            </PDFViewer>
                        </div>
                        <form onSubmit={handleSignedApp}>
                            <center><p>Sign your full name below</p></center>
                            <center id="sigContainer"><input id="signature" type="text" required /></center>
                            <center><input id="agreement" type="checkbox" required /> I Agree</center>
                            <center><input type="submit" value="Sign" id="finalize" className="blue-btn" /></center>
                        </form>
                    </div>
                )}
            </>
        );
    } else {
        return(
            <>
                {loaderVisible && (
                    <FinanceLoader messages={onLoadMessages} />
                )}
                {!loaderVisible && (
                    <div id="final-bg">
                        <center><h1 id="final-heading">Decision Disclosure</h1></center>
                        <div id="pdf-holder">
                            <PDFViewer width="50%" height="100%" id="viewer">
                                <FinanceAgreementPDF financeTerms={financeTerms} userData={userData} carInfos={carInfos} />
                            </PDFViewer>
                        </div>
                        <center><button id="finalize" className="blue-btn2" onClick={handleBackToHome}>Back to Homepage</button></center>
                    </div>
                )}
            </>
        );
    }
}