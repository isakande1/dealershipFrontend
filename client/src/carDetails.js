import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, border } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Center, Text, Heading, Box, HStack, Flex, Grid, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
    AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Image
} from "@chakra-ui/react";
import { FaTimes, FaCheck, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import TestDriveForm from './TestDriveForm';
import './App.css';


export default function CarDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { car_id } = location.state; //retrive the selected car_id sent from the home page 
    const [carInfos, setCarInfos] = useState({}); //store the fecth car infos
    const [actualImage, setActualImage] = useState(""); //Image on the main frame
   

    //Get the selected car details
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(`/getCarInfos?car_id=${car_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch the car detail');
                }
                const data = await response.json();
                setCarInfos(data);
                setActualImage(data.image0) //main frame default image
            } catch (error) {
                console.error('Error :', error.message);
            }

        };
        fetchCar();

    }, []);
    //end

    //Function to switch the main image onclick
    const switchMainImage = (image) => {
        setActualImage(image)

    };
    //end

    //highlight the image currently displayed in the main frame
    const highlight = (image) => {
        return actualImage == image ? { border: "2px solid white" } : {};
    };
    //end
    


    //style car image in small frame
    const imageStyle = {
        overflow: "hidden",
        boxSize: "100%",
        alt: "car",
        objectFit: 'cover'
    }

    const imageBoxStyle = {
        w: "250px",
        h: "175",
        p: "10px",
        cursor: "pointer"


        /* transform: "translateY(-25%)"*/
    }

    //end

    //Component to layout the images of the car
    const CarImagesLayout = () => {

      const userData = location.state?.userData; 

      const handleNavigate = (path) => {
        navigate(path, { state: { userData } });
      };
        return (
            <Grid placeItems="center" bg="gray.700">
                {userData && (
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <button className="nav-button" onClick={() => handleNavigate('/homepage')}>
                Home
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={() => handleNavigate('/ServiceHistory')}>
                Service History
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={() => handleNavigate('/Service')}>
                Schedule Service
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={() => handleNavigate('/carAccessories')}>
                Car Accessories
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={() => handleNavigate('/ModifyInfo')}>
                Modify Info
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={() => handleNavigate('/Cart')}>
                Cart
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={() => handleNavigate('/PastPurchase')}>
                Past Purchase
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={() => handleNavigate('/OwnCar')}>
                Own Car
              </button>
            </li>
          </ul>
        </nav>
      )}
                <Box w="80%" h="550px" /*transform="translateY(-25%)"*/>
                    <Image
                        overflow="hidden"
                        boxSize="100%"
                        alt="car"
                        objectFit='cover'
                        src={actualImage}
                    />
                </Box>

                <Grid templateColumns="repeat(5,1fr)" placeItems="center" gap="10px">
                
                    <Box sx={{ ...imageBoxStyle, ...highlight(carInfos.image0) }} onClick={() => switchMainImage(carInfos.image0)} >
                        <Image sx={imageStyle} src={carInfos.image0} />

                    </Box>

                    <Box sx={{ ...imageBoxStyle, ...highlight(carInfos.image1) }} onClick={() => switchMainImage(carInfos.image1)} >
                        <Image sx={imageStyle} src={carInfos.image1} />
                    </Box>

                    <Box sx={{ ...imageBoxStyle, ...highlight(carInfos.image2) }} onClick={() => switchMainImage(carInfos.image2)} >
                        <Image sx={imageStyle} src={carInfos.image2} />
                    </Box>

                    <Box sx={{ ...imageBoxStyle, ...highlight(carInfos.image3) }} onClick={() => switchMainImage(carInfos.image3)} >
                        <Image sx={imageStyle} src={carInfos.image3} />
                    </Box>

                    <Box sx={{ ...imageBoxStyle, ...highlight(carInfos.image4) }} onClick={() => switchMainImage(carInfos.image4)} >
                        <Image sx={imageStyle} src={carInfos.image4} />
                    </Box>

                </Grid>
            </Grid>
        );
    };

    //end

      
    const handleMakeOffer= () =>{
      const userData = location.state?.userData; 
      if( typeof userData == "undefined"){
        const confirmed = window.confirm('You need to be logged in. Proceed to login?');
        if (confirmed) {
        // Redirect to login page
        navigate('/login', { state: { previousUrl: '/makeOffer' , car_id : car_id} });
        }
        return;
      }
      navigate('/makeOffer', {
           
        state: {
          userData: userData,
          car_name: ` ${carInfos.make} ${carInfos.model} ${carInfos.year}`,
          car_image: carInfos.image0,
          car_price: carInfos.price,
          car_id: carInfos.car_id
        },
      });

    };

    //component for the car description and the other options 
    const Options = () => {
        const location = useLocation();
        const userData = location.state?.userData; 
        const navigate = useNavigate();  
  

        const handleAddToCart = async () => {
            //prompt user to log in
            // console.log("id" , userData.customer_id);
            if( typeof userData == "undefined"){
            const confirmed = window.confirm('You need to be logged in. Proceed to login?');
            if (confirmed) {
            // Redirect to login page
            
            navigate('/login', { state: { previousUrl: '/carDetails' , car_id : car_id} });
            }
            return;
          }
            //end prompt user to log in
          
          try {
            // Send data to endpoint
            const response = await fetch('http://localhost:5000/add_to_cart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                customer_id: userData.customer_id,
                car_id: car_id,
                item_price: carInfos.price,
                item_name: `${carInfos.model} ${carInfos.make}`,
                item_image: carInfos.image0,
              }),
            });
        
            if (response.ok) {
              //window.confirm('Car added successfully');
              //NAvigate to the next page 
              console.log('userData', userData)
              navigate('/Addons', {
               
                state: {
                  userData: userData,
                  car_name: ` ${carInfos.make} ${carInfos.model} ${carInfos.year}`,
                  car_image: carInfos.image0,
                  car_price: carInfos.price,
                  car_id: carInfos.car_id
                },
              });
 //Take customer to cart if the car is already in his cart
            }else    if(response.status === 409){
              const confirmed = window.confirm('Car already in the cart. Checkout insead?')
              if (confirmed) {
              // Redirect to cart
              navigate('/Cart', {
               
                state: {
                  userData: userData,
                  car_name: ` ${carInfos.make} ${carInfos.model} ${carInfos.year}`,
                  car_image: carInfos.image0,
                  car_price: carInfos.price,
                  car_id: carInfos.car_id
                },
              });
              }
              
            } else {
              
              throw new Error('Error adding car');
            }
          } catch (error) {
            // Handle any errors here
            console.error(error);
            window.confirm('Car could not be added');
          }
        };

        const handleNavigateTestDrive = () => {
          if (userData && carInfos) {
            navigate('/carDetails/schedule-test-drive', {
              state: { userData, carInfos },
            });
          } else {
            console.error('userData or carInfos is undefined.');
          }
        };
        return (
          <Grid bg="black" templateColumns="1fr 1fr" justifyItems="center">
            <Box>
            <Text marginBottom="5px" color="white">
                VIN-number: {carInfos.car_id}
              </Text>
              <Text marginBottom="5px" marginTop="8px" color="white">
                Make: {carInfos.make}
              </Text>
              <Text marginBottom="5px" color="white">
                Year: {carInfos.year}
              </Text>
              <Text marginBottom="5px" color="white">
                Model: {carInfos.model}
              </Text>
              <Text marginBottom="5px" color="white">
                Color: {carInfos.color}
              </Text>
              <Text marginBottom="5px" color="white">
                Engine: {carInfos.engine}
              </Text>
              <Text marginBottom="5px" color="white">
                Transmission: {carInfos.transmission}
              </Text>
              <Text marginBottom="5px" color="white">
                Price: ${carInfos.price}
              </Text>
            </Box>
            <Box>
              <Button
                marginBottom="5px"
                marginTop="8px"
                display="block"
                variant="light"
                w="200px"
                bg="#44337A"
                onClick={handleNavigateTestDrive}
              >
                Schedule test drive 
              </Button>
              <Button marginBottom="5px" display="block" variant="light" w="200px" bg="#44337A">
                Financing
              </Button>
              <Button marginBottom="5px" display="block" variant="light" w="200px" bg="#44337A" onClick={handleMakeOffer}>
                Make an offer
              </Button>
              <Button
                marginBottom="5px"
                display="block"
                variant="light"
                w="200px"
                bg="#44337A"
                onClick={handleAddToCart} 
              >
                Add to cart
              </Button>
            </Box>
          </Grid>
        );
      };
    //



    return (
      <Grid templateRows="1fr 1fr">
          <CarImagesLayout />
            <Options />
      <Routes>
      <Route path="/carDetails/*" element={<CarDetails />} />
        <Route path="/carDetails/schedule-test-drive" element={<TestDriveForm />} />
      </Routes>
    </Grid>

    );
}