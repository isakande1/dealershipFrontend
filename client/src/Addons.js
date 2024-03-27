import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, border } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Center, Text, Heading, Box, HStack, Flex, Grid, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
    AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Image
} from "@chakra-ui/react";
import { FaTimes, FaCheck, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';

export default function Addons(){
    const location = useLocation();
    const [fetChedPackages, setFetchedPackages] = useState({});
    const [itemsCount, setItemsCount] = useState(0);
    const {car_name} = location.state;
    const {car_image} = location.state;
    const {car_price} = location.state;
    const [total, setTotal] = useState(car_price);
    const [packageToAdd,setPackageToadd] = useState([]);
    
    const fetchPackages = () => {
      axios.get('/ServicesPackage')
        .then(response => {
          console.log('services package cars:', response.data);
          setFetchedPackages(response.data);
           })
        .catch(error => {
          console.error('Error fetching service package:', error);
        });
    };

    useEffect( () =>{
        fetchPackages();
    },[]
   );
   /*styling */
   //highlight the package if added
       const highlight = (isAdded) => {
        return isAdded ? { border: "2px solid white" } : {};
    };
    //end
    const imageStyle = {
      overflow: "hidden",
      boxSize: "100%",
      alt: "package",
      objectFit: 'cover'
  }
   const buttonStyle = {
    display :"block",
    variant : "light",
    w:"200px",
    bg :"green"
   }

   const buttonColor = (isAdded) =>{
    return isAdded ? { bg : "red" } : {bg : "blue"};
   }
    //style package i
    const packageBoxStyle = {
      height : "200px",
      width : "200px",
      borderRadius:"2px"
    }
  
    const AddtoCart = ({ customer_id, item_price, item_name,  service_package_id}) => {
        axios.post('/add_cart_service', { customer_id, item_price, item_name,  service_package_id })
          .then(response => {
            console.log('Filtered cars:', response.data);
            return { border: "2px solid white" };
          })
          .catch(error => {
            console.error('Error adding cars:', error);
          });
      };
    const CarInfos = () =>{
        return(
        <Grid bg="black" gridTemplateColumns="0.12fr 1fr 0.10fr" > 
            <Box width="140px" height="100px"> 
            <Image
                        overflow="hidden"
                        boxSize="100%"
                        alt="car"
                        objectFit='cover'
                        src={car_image}
                    />
            </Box>
            <Box>
                <Heading color="white"> {car_name} </Heading>
           </Box>
           <Box>
             <Text color="white" > Total </Text>
             <Text color="orange"> ${total} </Text>
           </Box>
        </Grid>);
    }
     const Packages =(allpackagesInfos)=>{
        <Grid>
         </Grid>
     }
//add a package
     const addPackage =(packageInfos,setIsAdded) =>{
      setPackageToadd(prevArray => [...prevArray,packageInfos]);
      setIsAdded(false);

        
     }
     //remove a package
     const removePackage =(setIsAdded) =>{
      const newArray = packageToAdd.slice(0,-1);
      setPackageToadd(newArray);
      setIsAdded(true);
     }

    const Package =(packageInfos) =>{
      const [isAdded,setIsAdded]  = useState(false);
      const [buttonName, setButtonName] = useState(isAdded ? "Add" : "Remove");
       <Box sx = {{...packageBoxStyle,...highlight(isAdded)}} > 

        <Button  sx={{...buttonStyle,...buttonColor(isAdded)}}onClick={()=>{ isAdded ?  removePackage(setIsAdded) : addPackage(packageInfos,setIsAdded)}}> 
        {buttonName}
        </Button>
        </Box>
        

        
    }
   
    return(
        <>
        <Box> 
       < CarInfos />
        </Box>
        <Grid bg="gray.700" minH="100vh">

       </Grid>
       <Flex bg="black" justifyContent="center" position="fixed" h="140px" w="100%" zIndex="2" bottom="0" left="0">
       <Button>
       <Text>Continue</Text>
        </Button>
        </Flex>
        </>

    );

};