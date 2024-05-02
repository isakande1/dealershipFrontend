import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, border } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Center, Text, Heading, Box, HStack, Flex, Grid, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
    AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Image
} from "@chakra-ui/react";
import { FaTimes, FaCheck, FaChevronDown } from 'react-icons/fa';
import {flushSync, unstable_batchedUpdates} from 'react-dom';
import axios, { all } from 'axios';

export default function Addons(){
    const location = useLocation();
    const [allpackagesInfos, setAllpackagesInfos] = useState([]);
    const [itemsCount, setItemsCount] = useState(0);
    const {car_name} = location.state;
    const {car_image} = location.state;
    const {car_price} = location.state;
    const {car_id} = location.state;
    const userData = location.state?.userData; 
    const customer_id =userData.customer_id;
    const [total, setTotal] = useState(car_price);
    const [packageToAdd,setPackageToAdd]= useState([]);
    //below state use to switch between add and remove option
    const [isAdded0,setIsAdded0]  = useState(false);
    const [isAdded1,setIsAdded1]  = useState(false);
    const [isAdded2,setIsAdded2]  = useState(false);
    const [isAdded3,setIsAdded3]  = useState(false);
    const [isAdded4,setIsAdded4]  = useState(false);
    const [isAdded5,setIsAdded5]  = useState(false);
    const navigate = useNavigate();   

    //fetch the service packages
    const fetchPackages = () => {
      axios.get('http://localhost:5000/ServicesPackage')
        .then(response => {
         // console.log('services package cars:', response.data);
          setAllpackagesInfos(response.data);
           })
        .catch(error => {
          console.error('Error fetching service package:', error);
        });
    };

    useEffect(() => {
      //console.log("usfhfg", userData);
      fetchPackages();
  }, []);

  //send the packages to add to a single end point that will had them to the cart and to subscribed dervices
  const AddtoCartAndOwnedService = (customer_id, packages,userData,car_id ) => {
    if(packages.length ===0){
      navigate('/Cart', { state: { userData } });
      return;
    }
    //console.log("packages",packages);
      axios.post('http://localhost:5000/addtoCartAndOwnedService', { customer_id , packages, car_id})
        .then(()=> {
          navigate('/Cart', { state: { userData } }) ;
        })
        .catch(error => {
          window.confirm('Something wrong happened, please try again !');
          
        });
    };
//end

//use to highklight a selected package
       const highlight = (isAdded) => {
        return isAdded ? { border: "2px solid white" } : {};
    };
    //end
    const imageStyle = {
      overflow: "hidden",
       h: "200px",
       w:"100%",
      alt: "package",
      objectFit: 'cover'
  }
   const buttonStyle = {
    display :"block",
    variant : "light",
     w:"100%",
    bg :"green",
    position:"absolute",
    bottom:"0",
    fontFamily:"sans-serif"
   
   }

   //use to switch the color of a package box button
   const buttonColor = (isAdded) =>{
    return isAdded ? { bg : "red" } : {bg : "blue"};
   }
   //end
    //style package box
    const packageBoxStyle = {
      height : "365px",
      width : "200px",
      borderRadius:"3px"
    }
  
  //display the car
    const CarInfos = () =>{
        return(
        <Grid bg="black" gridTemplateColumns="0.12fr 1fr 0.10fr"   width="100%" mt="5px" > 
            <Box width="140px" height="100px"> 
            <Image
                        overflow="hidden"
                        boxSize="100%"
                        alt="car"
                        objectFit='cover'
                        src={car_image}
                    />
            </Box>
            <Box fontFamily="sans-serif">
                <Heading color="white"> {car_name} </Heading>
           </Box>
           <Box>
             <Heading color="white" fontFamily="sans-serif" fontSize="22px"> Total </Heading>
             <Text color="orange" fontFamily="sans-serif"> ${total.toFixed(2)} </Text>
           </Box>
        </Grid>);
    };

    //regroup all packages displayed
     const Packages =({allpackagesInfos})=>{
  
      return(
       
        <Grid w= "70%" h="80%" gridTemplateColumns={{base : "repeat(1,1fr)", md:"repeat(2,1fr)", xl:"repeat(3,1fr)" }} rowGap="25px" marginLeft="10%"  marginBottom="40px">
          
      {/* {allpackagesInfos.map((packageInfos, index) => (
        <Package key={index} packageInfos={packageInfos} isAdded={isAdded[index]} setIsAdded={setIsAdded} />
      ))} */}
      
      { <Package  packageInfos={allpackagesInfos[0]} isAdded={isAdded0} setIsAdded={setIsAdded0} />}
      { <Package packageInfos={allpackagesInfos[1]} isAdded={isAdded1} setIsAdded={setIsAdded1} />}
      { <Package  packageInfos={allpackagesInfos[2]} isAdded={isAdded2} setIsAdded={setIsAdded2} />}
      { <Package packageInfos={allpackagesInfos[3]} isAdded={isAdded3} setIsAdded={setIsAdded3} />}
      { <Package  packageInfos={allpackagesInfos[4]} isAdded={isAdded4} setIsAdded={setIsAdded4} />}
      { <Package packageInfos={allpackagesInfos[5]} isAdded={isAdded5} setIsAdded={setIsAdded5} />}
     
    </Grid>
    
         );
     }
    
//add a package
    const AddPackage =(packageInfos,index) =>{
    flushSync(()=>{  
      setPackageToAdd([...packageToAdd, packageInfos]);
      //console.log(packageToAdd) ;
      setTotal((prev)=>prev + packageInfos.price);
       packageToAdd[index] = packageInfos;
      //console.log(packageToAdd[index]) ;
      setItemsCount((prev) => prev + 1);
    });
        
     }
  
    
     
     //remove a package 
     const RemovePackage =(packageInfos) =>{
      //console.log("packinfos" ,packageInfos) ;
      //console.log("remove" ,packageInfos.service_package_id) ;
      setTotal((prev)=> prev - packageToAdd.filter(a=>a.service_package_id == packageInfos.service_package_id)[0].price);
      setPackageToAdd(packageToAdd.filter(a=>a.service_package_id !== packageInfos.service_package_id));
      //console.log(packageToAdd);
      setItemsCount((prev) => prev - 1);
     }

    
    //box for one package
     const Package = ({ packageInfos, isAdded, setIsAdded }) => {
      // useEffect(()=>{
      //   isAdded ? RemovePackage(index) : AddPackage(packageInfos,index);
      // },[]);
  
      if (!packageInfos) {
          return null; // Render nothing if packageInfos is undefined
      }
  
      const handleClick = () => unstable_batchedUpdates(() => {
          isAdded ? setIsAdded(false) : setIsAdded(true);
          isAdded ? RemovePackage(packageInfos) : AddPackage(packageInfos);
      });

  
  
      return (
          <Grid sx={{ ...packageBoxStyle, ...highlight(isAdded)}}    pos="relative" >
             <Box> 
              <Image sx={imageStyle} src={packageInfos.image} />
              </Box>
              <Box h="150px" >
              <Text color="white" fontWeight="bold" margin="0" fontFamily="sans-serif" >{packageInfos.name} </Text>
              <Text color="white"margin="0" fontFamily="sans-serif" > ${packageInfos.price}</Text>
              <Text color="white" margin="0" fontFamily="sans-serif" > {packageInfos.description}</Text>
              </Box>
            
              <Button fontFamily="sans-serif" sx={{ ...buttonStyle, ...buttonColor(isAdded) }} onClick={() => handleClick()} color="white">
                  {isAdded ? "Remove" : "Add"}
              </Button>
              
          </Grid>
      );
  };
  
  
   
    return(
        <>
       
       < CarInfos />
        
        <Flex bg="gray.700" minH="100vh" justify="center" paddingTop="25px" >
       { <Packages allpackagesInfos= {allpackagesInfos}/>}
        </Flex >
       <Flex bg="rgba(0, 0, 0, 0.5)"  justifyContent="center" position="fixed" h="40px" w="100%" zIndex="2" bottom="0" left="0">
       <Button onClick={()=>AddtoCartAndOwnedService( customer_id, packageToAdd, userData, car_id)}>
       <Text marginTop="15px" fontFamily="sans-serif">{itemsCount > 0 ? `Continue(${itemsCount})` : "Skip add-ons"} </Text>
        </Button>
        </Flex>
        </>

    );

};