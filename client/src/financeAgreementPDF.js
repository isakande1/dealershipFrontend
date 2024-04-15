import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const FinanceAgreementPDF = ({ financeTerms, userData, carInfos }) => (
  <Document>
    <Page size="A4">
      <View style={styles.section}>
        <Text style={styles.title}>Finance Agreement</Text>
        <Text>Customer Name: {userData.first_name} {userData.last_name}</Text>
        <Text>Customer Email: {userData.email}</Text>
        <Text>Customer Address: {userData.Address}</Text>
        <Text>Customer Phone Number: {userData.phone}</Text>
        <Text> </Text>
        <Text>Car Make: {carInfos.make}</Text>
        <Text>Car Model: {carInfos.model}</Text>
        <Text>Car Price: ${carInfos.price}</Text>
        <Text> </Text>
        <Text>Finance Status: {financeTerms.status}</Text>
        <Text>APR: {financeTerms.terms.apr}</Text>
        <Text>Loan Term: {financeTerms.terms.loan_term} months</Text>
        <Text>Monthly Payment: ${financeTerms.terms.monthly_payment}</Text>
        <Text>Principal: ${financeTerms.terms.principal}</Text>
      </View>
    </Page>
  </Document>
  );
  
  // Define styles for the PDF
  const styles = StyleSheet.create({
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      fontWeight: 'bold'
    }
  });
  
  export default FinanceAgreementPDF;