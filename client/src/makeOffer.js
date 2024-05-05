import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, border } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Center, Text, Heading, Box, HStack, Flex, Grid, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
    AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Image
} from "@chakra-ui/react";
import { FaTimes, FaCheck, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';

export default function MakeOffer(){
const [ isOfferSent, SetIsOfferSent] = useState(null);
const location = useLocation();
const {car_name} = location.state;
const {car_image} = location.state;
const {car_price} = location.state;
const {car_id} = location.state;
const {status} = location.state;
const customer_id =location.state?.customer_id; 
const [offerValue, setOfferValue] = useState("")
 console.log(car_image);
    const sendOffer = (customer_id, car_id, offer,status) => {
        axios.post('http://localhost:5000/makeOffer',{customer_id, car_id, offer,status})
            .then(response => {
                console.log('offer response:', response.data);
                SetIsOfferSent(true)
               
            })
            .catch(error => {
                SetIsOfferSent(false)
                console.error('Error fetching service package:', error);
            });
    };
// console.log(offerValue);
    return(
        <Flex minH="100vh" minW="100vh" bg='black' bgGradient="linear(to-b, black, gray.600)" justifyContent="center" alignItems="center" >
        <Grid  bg="rgba(128, 128, 128, 0.15)" color="white" w="900px" h="400px" borderRadius="md" gridTemplateColumns="1fr 1fr" id="makeOfferBox">
            <Box>
                <Text fontFamily="sans-serif"> {car_name} </Text> 
             <Image     overflow="hidden" w="100%" h="80" alt="car" objectFit='cover' src={car_image}/>
             <Text fontFamily="sans-serif"> Price: ${car_price}</Text>
            </Box>
            <Flex  justifyContent="center" alignItems="center" flexDirection="column"> 
            {isOfferSent === true ? <Text fontSize="sm" color="green">Offer sent sucessfully ! </Text> 
            :isOfferSent === false ? <Text fontSize="sm" color="red">Something went wrong, please try again! </Text> : null }
            <Input type="number" placeholder="Enter your offer" w="60%" onChange={(e)=>{setOfferValue(e.target.value); SetIsOfferSent(null)}} />
            <Button variant="light" bg="#44337A" marginTop="10px" marginLeft="-90px" fontFamily="sans-serif" onClick={()=>{sendOffer(customer_id,car_id,offerValue,status)}}> Send Offer </Button>
            </Flex>
         </Grid>
         </Flex>

    );

};