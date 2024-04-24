import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './App.css'; // Assuming this is for custom styling (optional)

const styles = StyleSheet.create({
    page: {
      padding: 20, // Add some padding for margins
    },
    header: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: 'center',
    },
    subheader: {
      fontSize: 16,
      marginBottom: 10,
    },
    table: {
      display: 'flex', // Set display to flex for horizontal layout
      flexDirection: 'column',
    },
    tableHeader: {
      display: 'flex',
      flexDirection: 'row',
      borderBottom: '1px solid lightgray', // Add a border to the header
    },
    tableItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between', // Distribute content evenly
      alignItems: 'flex-start', // Align content to the top
      borderBottom: '1px solid lightgray', // Add border to each row
      marginBottom: 5,
    },
    tableLabel: {
      fontWeight: 'bold',
      flex: 1, // Allocate some flex space for wider labels
      whiteSpace: 'nowrap', // Prevent text wrapping
    },
    totalText: {
      fontSize: 16,
      marginTop: 10, // Add some margin after the table
    },
    footer: {
      marginTop: 20, // Add some margin before the footer
      fontSize: 10,
      textAlign: 'center',
    },
  });

const SalesReport = ({ salesReportContent }) => {
    const calculateTotalSales = (data) => {
      // Implement logic to calculate total sales from price
      return data.length;
    };
  
    const totalSales = calculateTotalSales(salesReportContent);

    const calculateTotalRevenue = (data) => {
        // Calculate total revenue by summing the price of each sale
        const totalRevenue = data.reduce((acc, sale) => acc + sale.price, 0);
        return totalRevenue;
    };

    const totalRevenue = calculateTotalRevenue(salesReportContent);
    
    console.log(salesReportContent);

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            {/*<Image src="path/to/your/logo.png" alt="Dealership Logo" />*/}
            <Text style={styles.header}>Velocity Motors Sales Report</Text>
          </View>
          <Text style={styles.subheader}>Generated on {new Date().toLocaleDateString()}</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableLabel}>Customer ID</Text>
              <Text style={styles.tableLabel}>Item</Text>
              <Text style={styles.tableLabel}>Name</Text>
              <Text style={styles.tableLabel}>Price</Text>
            </View>
            {salesReportContent.map((sale) => (
                <View key={sale.id} style={styles.tableItem}>
                    <Text>{sale.customer_id}</Text>
                    <Text>{sale.item_type}</Text>
                    <Text>{sale.name}</Text>
                    <Text>{sale.price}</Text>
                </View>
            ))}
          </View>
          <Text style={styles.totalText}>Total Sales: {totalSales.toFixed(0)}</Text>
          <Text style={styles.totalText}>Total Revenue: ${totalRevenue}</Text>
          <View style={styles.footer}>
            <Text>This report is for informational purposes only and may not reflect final sales figures.</Text>
            <Text>[Dealership Name] | [Website Address] | [Phone Number]</Text>
          </View>
        </Page>
      </Document>
    );
  };

export default SalesReport;
