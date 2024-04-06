import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, border } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Center, Text, Heading, Box, HStack, Flex, Grid, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
    AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Image
} from "@chakra-ui/react";
import { FaTimes, FaCheck, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';

export default function ManageOffers(){
    const storedData = sessionStorage?.getItem('data');
    const parsedData = JSON.parse(storedData);
    const customer_id = parsedData?.['customer_id'];
    const [fetchedData,setFetchedData] = useState([]);
    const [category, setCategory] = useState("pending");
    const [status, setStatus] = useState("pending");
    console.log(customer_id)

    useEffect(()=>{
        const fetchOffers =()=>{
            axios.post('/fetchOffers',{customer_id,category} )
            .then( (response) =>{
                setFetchedData(response.data);
            }
            )
            .catch(error=>{
               // window.confirm('Something wrong happened, please try again !');
            });
        } 
        fetchOffers();
}, [category,status]);

const acceptDeline =(status)=>{
    axios.post('/fetchOffers',{status} )
    .then( (response) =>{
        setStatus(status);
    }
    )
    .catch(error=>{
        //window.confirm('Something wrong happened when trying to accept/decline, please try again !');
    });
} 
const buttonStyle = {
    marginBottom :"10px",
     h:"80px",
    variant:"light",
    w:"100%" ,
    bg:"#44337A" 
}
const buttonStyleOfferBox={
    variant:"light",
     w:"100px",
     bg:"#44337A"
}
const highlight = (category, status) => {
    return category=== status ? { border: "2px solid white" } : {};
};

const offerBox = (data) =>{
  <Grid gridTemplateColumns="1fr 3fr" bg="rgba(128, 128, 128, 0.15)" color="white"borderRadius="md" h = "400px" w = "80%">
     <Box h ="95%">
    <Image overflow="hidden" w="100%" h="100%" alt="car" objectFit='cover' src={data.car_image}/>
    </Box>
    <Grid gridTemplateRows="5fr 1fr"> 
        <Box>
            <Text>"Car: "{`${data.make} ${data.model} ${data.year}`} </Text>
            <Text> "Price: $" {data.price}</Text>
            <Text> "Offer: $"{data.offer_price}</Text>
         </Box>
         <Flex flexDir="column" justifyContent="space-between">
            <Button sx={buttonStyleOfferBox} onClick={()=>{}} >Accept </Button>
            <Button sx={buttonStyleOfferBox} onClick={()=>{}} >Decline </Button>
            <Button sx={buttonStyleOfferBox} onClick={()=>{}} >Counter </Button>
         </Flex>
    </Grid>
 </Grid>
}


return(
     
    <Box bg='black' bgGradient="linear(to-b, black, gray.600)" minH="100vh" minW="100vh" >
     <Heading color="white" paddingTop="20px"fontFamily= "cursive"> Manage all offers  </Heading> 
    <Grid gridAutoColumns="1fr 4fr"> 
        <Flex bg="rgba(128, 128, 128, 0.15)" color="white" w="300px" h="400px" borderRadius="md" justifyContent="center" alignContent="center" flexDirection="column" marginTop="5%">
        <Button sx={{...buttonStyle,...highlight("pending",category)}}   onClick={()=>{setCategory("pending")}}>Pending</Button>
        <Button sx={{...buttonStyle,...highlight("accepted",category)}} onClick={()=>{setCategory("accepted")}}>Accepted</Button>
        <Button sx={{...buttonStyle,...highlight("rejected",category)}}  onClick={()=>{setCategory("rejected")}}>Rejected</Button>
        </Flex>
        <Flex justifyContent="space-between" flexDirection="row"> 
        {fetchedData ? (fetchedData.map((data, index) => ( <offerBox key={index} data={data} /> ))) : (<Text>No {category} offers</Text> )}
        </Flex>
    </Grid>
    </Box>
);

};