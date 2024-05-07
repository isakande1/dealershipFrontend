import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './App.css';

const Customer_View_Contract = ({contract}) => {

    return(
        <Document>
        < Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Finance Agreement</Text>
            <Text style={styles.subtitle}>This document constitutes an agreement between:</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.heading}>Customer Information</Text>
              <Text>Name: {contract.first_name} {contract.last_name}</Text>
              <Text>Email: {contract.email}</Text>
              <Text>Address: {contract.address}</Text>
              <Text>Phone Number: {contract.phone_number}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Car Information</Text>
              <Text>Year: {contract.car_year}</Text>
              <Text>Make: {contract.car_make}</Text>
              <Text>Model: {contract.car_model}</Text>
              <Text>Price: ${contract.car_price}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Credit Score</Text>
              <Text>{contract.credit_score}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Finance Terms</Text>
              <Text>Status: {contract.finance_decision}</Text>
              <Text>Loan Term: {contract.loan_term} Months</Text>
              <Text>Down Payment: {contract.down_payment}</Text>
              <Text>APR: {(parseFloat(contract.loan_apr) * 100).toFixed(2)}%</Text>
              <Text>Monthly Payment: ${contract.loan_monthly_payment}</Text>
            </View>
            <View style={styles.footer}>
              <View style={styles.signatureContainer}>
                <Text style={styles.signature}>Authorized Signature</Text>
              </View>
              <Text style={styles.date}>Date: {contract.contract_date}</Text>
            </View>
          </View>
        </Page>
      </Document>
    )
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

export default Customer_View_Contract;