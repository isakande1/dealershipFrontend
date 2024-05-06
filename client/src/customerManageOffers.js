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
    const [message,setMessage]= useState("Pending offers");
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();
    // console.log(customer_id)
   
    const fetchOffers =()=>{
    axios.post('http://localhost:5000/fetchOffers',{customer_id,category} )
    .then( (response) =>{
        setFetchedData(response.data);
        // console.log("data fetched", response.data)
    }
    )
    .catch(error=>{
        console.log("error message", error)
    //    window.confirm('Something went wrong, please try again !');
    });
} 
    useEffect(()=>{
        fetchOffers();
}, [category,status]);

const acceptOffer =(customer_id,offer_id,car_id,offer_price,car_name,car_image)=>{
    axios.post('http://localhost:5000/acceptOffer',{customer_id,offer_id,car_id,offer_price,car_name,car_image} )
    .then( (response) =>{
        setStatus((prev)=>!prev);
    }
    )
    .catch(error=>{
        window.confirm('Something went wrong, please try again !');
    });
};
    const rejectOffer =(offer_id)=>{
        console.log("data smalle fetched", offer_id)
        axios.post('http://localhost:5000/rejectOffer',{offer_id} )
        .then( (response) =>{
            setStatus((prev)=>!prev);
        }
        )
        .catch(error=>{
            //window.confirm('Something wrong happened when trying to accept/decline, please try again !');
        });
} ;

const handleCounterOffer= (data) =>{
    console.log("data  "  , data);
    navigate('/makeOffer', {
         
      state: {
        status: "customerCountered",
        customer_id: data.data.customer_id,
        car_name: ` ${data.data.make} ${data.data.model} ${data.data.year}`,
        car_image: data.data.car_image,
        car_price: data.data.car_price,
        car_id: data.data.car_id
      },
    });

  };



const buttonStyle = {
    marginBottom :"10px",
     h:"80px",
    variant:"light",
    w:"100%" ,
    bg:"#44337A",
    fontWeight: "bold",
    color:"white",
    fontFamily:"sans-serif"
}
const buttonStyleOfferBox={
    variant:"light",
     w:"100px",
     bg:"#44337A",
     fontWeight: "bold",
    color:"white",
    fontFamily:"sans-serif"
}
const highlight = (category, status) => {
    return category=== status ? { border: "2px solid white" } : {};
};
console.log("data fetched", fetchedData)

const OfferBox = (data) =>{
    // console.log("data smalle fetched", data.data.offer_id)
    return(
  <Grid    gridTemplateColumns="1fr 3fr" bg="rgba(128, 128, 128, 0.15)" color="white"borderRadius="lg" h = "150px" w = "80%" marginBottom="20px" >
     <Box h ="150px" w="200px">
    <Image overflow="hidden" w="100%" h="100%" alt="car" objectFit='cover' src={data.data.car_image}/>
    </Box>
    <Grid gridTemplateRows="100px 1fr"> 
        <Box>
            <Text margin="0" fontFamily="sans-serif">Car: {`${data.data.make} ${data.data.model} ${data.data.year}`} </Text>
            <Text margin="0"> Price: ${data.data.car_price}</Text>
            <Text margin="0"> Offer: ${data.data.offer_price}</Text>
         </Box>
         {category === "managerCountered" && (<Flex flexDirection="row" justifyContent="25px">
            <Button sx={buttonStyleOfferBox} onClick={()=>{acceptOffer(data.data.customer_id,data.data.offer_id,data.data.car_id,data.data.offer_price,`${data.data.make} ${data.data.model}`,data.data.car_image)}} >Accept </Button>
            <Button sx={buttonStyleOfferBox}  ml="10px" onClick={()=>{rejectOffer(data.data.offer_id)}} >Decline </Button>
            <Button sx={buttonStyleOfferBox} ml="10px" onClick={()=>{handleCounterOffer(data)}} >Counter  </Button>
         </Flex>)}
    </Grid>
 </Grid>
    );
}


return(
     
    <Box bg='black' bgGradient="linear(to-b, black, gray.600)" minH="100vh" minW="100vh" position="relative">
     <Heading position="fixed" color="white" paddingTop="20px"fontFamily="sans-serif"> Manage all offers  </Heading> 
    <Grid overflowY={"auto"}> 
        <Flex position="fixed"  bg="rgba(128, 128, 128, 0.15)" color="white" w="300px" h="500px" borderRadius="md" justifyContent="center" alignContent="center" flexDirection="column" marginTop="5%">
        <Button sx={{...buttonStyle,...highlight(" pending",category)}}   onClick={()=>{setCategory("pending"); setMessage("Pending offers")}}>Pending offers</Button>
        <Button sx={{...buttonStyle,...highlight(" pending",category)}}   onClick={()=>{setCategory("customerCountered"); setMessage("Pending counter offers")}}>Pending counter offers</Button>
        <Button sx={{...buttonStyle,...highlight("managerCountered",category)}}   onClick={()=>{setCategory("managerCountered"); setMessage("Received counter offers")}}>Received counter offers</Button>
        <Button sx={{...buttonStyle,...highlight("accepted",category)}} onClick={()=>{setCategory("accepted");setMessage("Accepted offers")}}>Accepted offers</Button>
        <Button sx={{...buttonStyle,...highlight("rejected",category)}}  onClick={()=>{setCategory("declined");setMessage("Declined offers")}}>Declined offers</Button>
        </Flex>
        <Flex marginLeft="350px"  flexDirection="column" marginTop="90px" overflowy="auto" w="70%"> 
        {fetchedData.length > 0 ? (fetchedData.map((data, index) => ( <OfferBox  key={index} data={data} style={{ animationDelay: `${index * 200}ms` }} className="offersFade" /> ))) : (<Text margin= "100px" color="white">No active {message} </Text> )}
        </Flex>
    </Grid>
    </Box>
);

};