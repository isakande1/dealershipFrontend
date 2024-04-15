import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const FinanceAgreementPDF = ({ financeTerms, userData, carInfos }) => (
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
          <Text>Loan Term: {financeTerms.terms.loan_term} Months</Text>
          <Text>Principal: ${financeTerms.terms.principal}</Text>
          <Text>APR: {financeTerms.terms.apr}%</Text>
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
);

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
  footer: {
    position: 'relative',
    borderTop: '1px solid #000',
    paddingTop: 10,
    marginTop: 60
  },
  signatureContainer: {
    marginTop: 20,
    borderTop: '1px solid #000',
    paddingTop: 10,
    alignItems: 'center'
  },
  signature: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  date: {
    fontSize: 12,
    textAlign: 'right'
  }
});

export default FinanceAgreementPDF;
