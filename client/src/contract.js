import React from 'react';
import { Document, Page,  View, StyleSheet } from '@react-pdf/renderer';
import {
    Center, Text, Heading, Box, HStack, Flex, Grid, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
    AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Image
} from "@chakra-ui/react";

 export default function ContractPDF({ isSigned, customerSignature, allCars,userData }){
  console.log("userdata  ",userData);
     const download =(isSigned)=>{
        return isSigned ? {} : {userUnit : "non-printable non-downloadable"} ;
     }

    return(
      <Document sx ={download(isSigned)} >
        <Page size="A4" style={styles.page}>
          <View > 
         <Center> <Heading> Contract of a purchase of a Car </Heading> </Center>
          </View>

          <View mb="20px"> 
          <Text> Seller's name : Velocity Motors </Text>
            <Text > Buyer's name : {`${userData.first_name} ${userData.last_name}`}</Text>
          </View>
          
          <View> 
            <Text display="block"> The Seller hereby conveys to the Buyer full ownership and title to the motor vehicle described below:</Text>
            <Text mb="10px">Description of motor vehicle(s) sold: </Text>
            {allCars.map((car,index)=>(
                <Text key={index}> Car : {car.car_name}   VIN : {car.car_id}  Price : {car.car_price}</Text>
             )
            )}
            <Text mt="10px"> Both parties hereby agrees that the payment match the total car 's price listed on this contract </Text>
            <Text mt ="10px"> This agreement shall be governed by the laws of the State of New Jersey and any applicable U. S. laws,
             and the County of Essex</Text>
             <Text mt="10px" > The parties hereby signify their agreement to the terms above by their signatures affixed below:</Text>

          </View>
          <View display="flex" flexDirection="column" justifyContent="space-between">
             <View>
             <Text> {customerSignature} </Text>
             <Text > Buyer' s signature</Text>
             <Text >Date: {new Date().toLocaleDateString()}</Text>
             </View>
 {isSigned && <View> 
             <Text> John Doe</Text>
             <Text> Seller' s signature</Text>
             <Text >Date: {new Date().toLocaleDateString()}</Text>
             </View>}
          </View>
        </Page>
      </Document>
    )

};


const styles = StyleSheet.create({
    page: {
      fontFamily: 'Times-Roman',
      padding: 40
    }
});