import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './App.css';

const FinanceAgreementPDF = ({ financeTerms, userData, carInfos }) => {

  if (financeTerms.status == "approved"){
    const loanTerm = financeTerms.terms ? financeTerms.terms.loan_term : '';
    console.log(financeTerms.status);

    return(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Finance Agreement</Text>
            <Text style={styles.subtitle}>This document constitutes an agreement between:</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.heading}>Customer Information</Text>
              <Text>Name: {userData.first_name} {userData.last_name}</Text>
              <Text>Email: {userData.email}</Text>
              <Text>Address: {userData.Address}</Text>
              <Text>Phone Number: {userData.phone}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Car Information</Text>
              <Text>Year: {carInfos.year}</Text>
              <Text>Make: {carInfos.make}</Text>
              <Text>Model: {carInfos.model}</Text>
              <Text>Price: ${carInfos.price}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Credit Score</Text>
              <Text>{financeTerms.credit_score}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Finance Terms</Text>
              <Text>Status: {financeTerms.status}</Text>
              <Text>Loan Term: {loanTerm} Months</Text>
              <Text>Principal: ${financeTerms.terms.principal}</Text>
              <Text>Down Payment: ${financeTerms.terms.down_payment}</Text>
              <Text>APR: {(financeTerms.terms.apr * 100).toFixed(2)}%</Text>
              <Text>Monthly Payment: ${financeTerms.terms.monthly_payment}</Text>
            </View>
            <View style={styles.footer}>
              <View style={styles.signatureContainer}>
                <Text style={styles.signature}>Authorized Signature</Text>
              </View>
              <Text style={styles.date}>Date: {new Date().toLocaleDateString()}</Text>
            </View>
          </View>
        </Page>
      </Document>
    )
  } else {
    console.log(financeTerms.status);
    return(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Finance Decision</Text>
            <Text style={styles.subtitle}>Notice of Decision</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.heading}>Application Declined</Text>
              <Text style={styles.reason}>{financeTerms.reason}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    padding: 40
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'underline'
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5
  },
  section: {
    marginBottom: 20
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecoration: 'underline'
  },
  reason: {
    marginBottom: 10,
    fontStyle: 'italic',
    color: 'red' // Customize color for emphasis
  },
});

export default FinanceAgreementPDF;