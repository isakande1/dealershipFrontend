import React from 'react';
import { Document, Page,  View, StyleSheet,  Text } from '@react-pdf/renderer';


 export default function ContractPDF({ isPaided, customerSignature, allCars,userData }){
  console.log("userdata  ",userData);
     

    return(
      <Document  >
        <Page size="A4" style={styles.page} bg="red">
          <View style={styles.title} > 
          <Text>Purchase agreement for car(s) </Text>
          </View>

          <View style={styles.section} > 
          <Text >Seller's name : Velocity Motors </Text>
          <Text >Buyer's name : {`${userData.first_name} ${userData.last_name}`}</Text>
          </View>
          
          <View style={styles.section} > 
            <Text >The Seller hereby conveys to the Buyer full ownership and title to the motor vehicle described below:</Text>
            <Text >Description of motor vehicle(s) sold: </Text>
            {allCars.map((car,index)=>(
                <Text key={index}> Car : {car.car_name}   VIN : {car.car_id}  Price : ${car.car_price}</Text>
             )
            )}
            </View>
            <View style={styles.section}>
            <Text >Both parties hereby agrees that the payment match the total car 's price listed on this contract. </Text>
            <Text >This agreement shall be governed by the laws of the State of New Jersey and any applicable U. S. laws,
             and the County of Essex</Text>
             <Text >The parties hereby signify their agreement to the terms above by their signatures affixed below:</Text>

          </View>
          <View style={styles.signatureContainer} >
             <View>
             
             <Text style={styles.signature}> {customerSignature} </Text>
             
             <Text >  Buyer' s signature</Text>
             <Text >  Date: {new Date().toLocaleDateString()}</Text>
             </View>
           <View> 
          {isPaided &&  <Text style={styles.signature}>  John Doe</Text>}
             <Text >  Seller' s signature</Text>
             <Text >  Date: {isPaided && new Date().toLocaleDateString()}</Text>
             </View>
          </View>
        </Page>
      </Document>
    )

};


const styles = StyleSheet.create({
    page: {
      bg :"red",
      fontFamily: 'Times-Roman',
      padding: 40
    }, 
     title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      textDecoration: 'underline',
      marginBottom: '20px'
    },
    section:{
      marginBottom: 20
      
    },
    signatureContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
     
    },
    signature:{
      textDecoration: 'underline',
    }
});