// import necessary libraries
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';
import {
  Center, Text, Heading, Box, HStack, Flex, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
  AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Select, Stack, Image, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaTimes, FaCheck, FaChevronDown, FaPhone, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import './App.css';
import { useLocation } from 'react-router-dom';
import CarDetails from './carDetails';
import TestDriveForm from './TestDriveForm';
import Addons from './Addons'
import MakeOffer from './makeOffer'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './img/logo.png'
//import CarAccessories from './carAccessories';
// npm install react-bootstrap bootstrap

function App() {
  return (
    // this will be used to navigate to different pages in our website
    <div>
    {/* <NavBar/> */}
    <Router>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Roles_login" element={<Roles_login />} />
          <Route path="/homepage" element={<SignedInHomepage />} />
          <Route path="/tech" element={<Technician />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/ModifyInfo" element={<CustomerModifyInfo />} />
          <Route path="/Cart" element={<CustomerCart/>} />
          <Route path="/PastPurchase" element={<PastPurchase />} />
          <Route path="/OwnCar" element={<OwnCar />} />
          <Route path="/carDetails/*" element={<CarDetails />} />
        <Route path="/carDetails/schedule-test-drive" element={<TestDriveForm />} />
          <Route path="/Service" element={<CustomerSerivceAppointment />} />
          <Route path="/ServiceHistory" element={<ServiceHistory />} />
          <Route path="/carAccessories" element={<CarAccessories />} />
          <Route path="/Addons" element={<Addons/>} />
          <Route path="ContactPage" element={<ContactPage/>} />
          <Route path="TestDriveHistory" element={<TestDriveHistory/>} />
          <Route path="makeOffer" element={<MakeOffer/>} />
          
        </Routes>
      </ChakraProvider>
    </Router>
    </div>
  )
}

// contact page that displays the email and phone number as text fields to the user
const ContactPage = () => {
  const handleClickCart = () => {
    const confirmed = window.confirm('You need to be logged in. Proceed to login?');
    if (confirmed) {
    // Redirect to login page
    window.location.href = '/login';
  }
    };

  return (
    <>
      <Box
        bg='black'
        w='100%'
        color='white'
        height="90vh"
        bgGradient="linear(to-b, black, gray.600)"
      >
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <span>Logo Will Go Here</span>
          </Box>
          <Flex>
            <Button as={Link} to="/login" variant="link" color="white" marginRight="20px">Login/Signup</Button>
            <Button variant="link" color="white" marginRight="10px" onClick={handleClickCart}>Cart</Button>
          </Flex>
        </Flex>
        <center><Text fontSize="4xl" fontWeight="bold" marginTop="30px">Contact Information</Text></center>
        <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaPhone style={{ marginRight: '15px', fontSize: '25px', marginTop: '50px' }} /> 
          <span style={{ fontSize: '25px', fontWeight: 'bold', marginTop: '50px' }}>123-321-1234</span>
        </Text>
        <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaEnvelope style={{ marginRight: '15px', fontSize: '25px', marginTop: '30px'}} />
          <span style={{ fontSize: '25px', fontWeight: 'bold', marginTop: '30px'}}>velocitymotors@cars.com</span>
        </Text>
      </Box>
      <Footer marginTop='-37px' />
    </>
  )
}

// this will be used as the footer on the site, must declare a marginTop or else defaults to 0px
const Footer = ({ marginTop }) => { 
  return (
    <Box bg="purple.900" height="100px" marginTop={marginTop}> {/* Use marginTop prop */}
      <Text textAlign="center" fontSize="lg" color="white">Velocity Motors &copy; {new Date().getFullYear()}</Text>
      <Flex justifyContent="center">
        <Button as={Link} to="/ContactPage" variant="link" color="white" alignContent="center" fontSize="lg" marginTop="15px">Contact Us!</Button>
      </Flex>
    </Box>
  );
};

const DropdownMenu = ({ title, options, selected, onSelect }) => {
  return (
    <Menu>
      <Box marginTop="15px" marginLeft="20px">
        <Text fontSize="lg" fontWeight="bold" color="white">{title}</Text>
        <MenuButton as={Box} bg="lightgray" color="black" fontSize="lg" p={2} width="180px" height="30px" marginTop='-10px'>
          <Flex alignItems="center" marginTop="-3px">
            <Box marginRight={2} marginTop='-5px'>
              <Icon as={FaChevronDown} />
            </Box>
            {selected && (
              <Text position="absolute" marginLeft="25px" marginTop="12px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{selected}</Text>
            )}
          </Flex>
        </MenuButton>
      </Box>
      <MenuList color="black" bg="white" borderRadius="md">
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => onSelect(option)}>{option}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

// component that will be used for displaying all cars with images and description and redirect the user to the car details page onclick
const CarDisplayBox = ({ car }) => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate();

  if (!car || !car.image || !car.year || !car.make || !car.model || !car.price) {
    return <Box>Error: Missing or invalid car data</Box>; // Display an error message if car data or required properties are missing
  }

  const handleCarDetailsClick = () => {
    navigate('/carDetails', {
      state: {
        car_id: car.car_id,
        userData,
        car_name: `${car.year} ${car.make} ${car.model}`,
        car_image: car.image,
        car_price: car.price,
      },
    });
  };

  return (
    <Box
      marginTop="100px"
      marginLeft="25px"
      marginRight="25px"
      height="375px"
      width="275px"
      color="white"
      bg="gray.700"
      onClick={handleCarDetailsClick}
      padding="10px 0 0 0"     // padding for top of the box where image and text goes of each car
    >
      <img
        src={car.image}
        alt="Car"
        style={{
          display: "block",
          margin: "auto",
          width: '240px',
          height: '275px'
        }}
      />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        marginLeft="15px"
        marginTop="10px"
        marginRight="15px"
      >
        <Text>{car.year} {car.make} {car.model}</Text>
        <Text>${car.price}</Text>
      </Flex>
      <Flex
        alignItems="center"
        marginLeft="15px"
        marginTop="10px"
        marginRight="15px"
      >
        <Text fontWeight="bold" marginTop="-10px">Color:</Text>
        <Text marginLeft="5px" marginTop="-10px">{car.color}</Text>
      </Flex>
    </Box>
  );
};

// handles clearing the filter selections and setting chosen filters
const FilterCarsSearch = ({ handleSearch }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [budget, setBudget] = useState('');
  const [clearSelection, setClearSelection] = useState(false);

  // component to handle when user clicks on "clear" button
  const handleClear = () => {
    setMake('');
    setModel('');
    setColor('');
    setBudget('');
    setClearSelection(true);
    handleSearch({ make: '', model: '', color: '', budget: '' }); // Trigger search with empty values
  };

  // handles clearing all filters applieds
  useEffect(() => {
    if (clearSelection) {
      setClearSelection(false);
    }
  }, [clearSelection]);

  // handle selecting an option from the dropdown as well as searching and clearing dropdown selections
  return (
    <Flex>
      <DropdownMenu title="Make" options={["Subaru", "Tesla", "Toyota", "Honda", "Ford", "Chevrolet", "BMW", "GMC"]} selected={make} onSelect={setMake} clearSelection={clearSelection} />
      <DropdownMenu title="Model" options={["Outback", "Model 3", "Camry", "CRV", "Explorer", "Equinox", "X5", "Yukon", "Tundra", "Pilot", "Escape", "Corolla", "Civic", "F150",
              "Silverado", "Sierra", "Accord", "Mustang", "Camaro", "Forester", "Model S", "X3", "Terrain", "Rav4", "Odyssey", "Fusion"]}selected={model} onSelect={setModel} clearSelection={clearSelection} />
      <DropdownMenu title="Color" options={["Gray", "Purple", "White", "Blue", "Black", "Silver", "Red", "Orange", "Green", "Yellow"]}selected={color} onSelect={setColor} clearSelection={clearSelection} />
      <DropdownMenu title="Budget" options={["$50000-$99999", "$100000-$139999", "$140000-$149999", "$150000-$199999", "$200000+"]} selected={budget} onSelect={setBudget} clearSelection={clearSelection} />
      <Button bg="lightgray" marginLeft="10px" marginTop="48px" textAlign="center" width="80px" height="30px" color="black" borderRadius="lg" onClick={() => handleSearch({ make, model, color, budget })}>
        <Text align="center" marginTop="16px">Search</Text>
      </Button>
      <Button bg="lightgray" marginLeft="10px" marginTop="48px" textAlign="center" width="80px" height="30px" color="black" borderRadius="lg" onClick={handleClear}>Clear</Button>
    </Flex>
  );
};

// this will be the homepage for when the user has not logged in to their account
const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [message, setMessage] = useState('');
  const carsPerPage = 12;

  useEffect(() => {
    fetchCars(); // Fetch based on the current state
  }, [currentPage, searchParams]); 

  const fetchCars = async () => {
    let url = '/cars_details';
    let data;
  
    if (Object.keys(searchParams).length > 0) {
      // POST request to endpoint if filters are applied
      const response = await axios.post(url, { ...searchParams, page: currentPage, per_page: carsPerPage });
      data = response.data;
    } else {
      // GET request for getting all cars in the db
      const response = await axios.get(`${url}?page=${currentPage}&per_page=${carsPerPage}`);
      data = response.data;
    }
  
    // Update the cars state based on the response
    setAllCars(data.cars);
    setTotalPages(data.total_pages);
    setCurrentPage(data.current_page);
  
    // Check if any cars were found and set the message accordingly
    if (data.cars.length === 0) {
      setMessage("Sorry, no cars found.");  // if no cars found, show this
    } else {
      setMessage('');   // if cars found after error message, set error message to blank
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (filters) => {
    // set the page to 1 when applying filters
    setCurrentPage(1);
    setSearchParams(filters);
  };

  const handleClear = () => {
    setSearchParams({});  // clear all search parameters
    setCurrentPage(1);    // reset page to 1
  };

  const handleClickCart = () => {
    const confirmed = window.confirm('You need to be logged in. Proceed to login?');
    if (confirmed) {
      window.location.href = '/login';
    }
  };

  const carsToDisplay = filteredCars.length > 0 ? filteredCars : allCars;

  // get the total number of pages based on the amount of filtered cars found
  const totalFilteredPages = Math.ceil(filteredCars.length / carsPerPage);

  // splits the cars into appropriate rows (4 in this case)
  const rows = [];
  for (let i = 0; i < carsToDisplay.length; i += 4) {
    const row = carsToDisplay.slice(i, i + 4);
    rows.push(row);
  }

  const headerHeight = 400; // Adjust this based on your actual header's height
  const footerHeight = 100; // Adjust this based on your actual footer's height
  const viewportHeight = window.innerHeight;
  const minContentHeight = `${viewportHeight - headerHeight - footerHeight}px`;

  return (
    <>
      <Box bg='black' w='100%' h='100vh' position='fixed' zIndex='-1' />
      <Box
        bg='black'
        w='100%'
        color='white'
        height="800px"
        bgGradient="linear(to-b, black, gray.600)"
        borderBottomLeftRadius="xl"
        borderBottomRightRadius="xl"
      >
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="187" height="150" fill="none" viewBox="0 0 284 225">
                <path fill="url(#a)" d="M0-59h284v284H0z"/>
                <defs>
                  <pattern id="a" width="1" height="1" patternContentUnits="objectBoundingBox">
                    <use href="#b" transform="scale(.00093)"/>
                  </pattern>
                  <image id="b" width="1080" height="1080" data-name="Velocity Motors Logo.png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDgAAAQ4CAYAAADsEGyPAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAA6Q9JREFUeJzs3QeYVNXZOPCv/FNUVEBEEQsWxBIVjYrdTewmKsZuVNaa2E2MxsTPsGAnUUBN7Lj2HtSoxCiCSTSxY01iQdTYG4piSfT858zummGYZWfu3Jk7C7/f85wn3ycw97137t49573nvOe//gsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoF1LS0vPXFth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tc/y+O/HjRv3N7M4IAWh8gFzVPNtYUPRGv7c/31TLY/XHYRky4hKvuUObW/AC7/PpjqfDt1IwnuvHHHr2skJWmvW14Q28e3gZZdddntaHc1YyO47221XcSdz1912q6ioW1otzoyI2yuWk+SIf6fpW9+qe2KjsMU3jLfeeuuME088ceus7x2gdnLP5gXPP//8302bNu3zLJ41sb311lvhtNNPD3369i3rOb7SKqvklyxmEWssoLpYv34V/d6Jy1Kuv+GG1J7nTz31VJzFsX7W9w50ayHBLgftavqmP5TYDjbM48smQrIB5myzbEJbvY3i3WgGZHBKzEWKf2bLpJDtXCDXGVvpgQceeC/NjuZrr78evrXZZmV3MhfPdUrjloZZdeLjdq0//dnP5ri7ysq5jnussRHXq2cVZ0eLiaBJkya9dtJJJzVlff8A6cs9l792wQUXXPnqq69mltwobA89/HA48KCD5viM/Mbqq4dHp0zJLMaY/P2/E04o+/fOYosvHi686KLUf5ecc845v8n6/oFuLSRYmlKPbRyLakzEN7zzenKjeKlOOSZ38jkvFPyd1vqfDXOjBEVvo+as46Z6Z5555lm1KOoZO3pbbLVVWR3N+IYw6w58jPeMM88suZvADkOH5memZB1jcWf+lltueffkk0/eLut7CEhP3C3lV7/61R9eefXVzJ8zxe2aa68tWYh0tTXWCC+//HLm8U1///2ydlWJy1Juve22msRw1113vZD7DlfM+j6Cbik3uDgqwYAkaqplXLaDnVVIVgB2tiVEYdYZINMNLklLSDa7qDXruKlerhO2zO9+97s3arXc4u133gl777NPmG+BBTrtaO608875AqVZd4xji0mDmORYYMEF8zVBBq64Yvjt+PGZxzWneO+7776Zp5xyyk5xqVHW9xNQnfhMHjdu3M2NllAtbPF5vc+wYfkkQXyGf3OddcIL06ZlHldHu/nmm+c40yQuY7kp93dqdfwXX3zxizPPPPP0rO8l6HZC23TyJAUDW2scl+1gC4Rk0/6jwUWfcUnBn00L83jSiPSEBLOLLDmbe5xxxhkH1Lp43YcffRT2P/DAkh3Nnr175+tZZN0hLmwx2XPxuHFhp112Cc88+2zm8ZQT7z1//OOnp55yanPcSjLrewpIJvfz2/fyyy776+uvv/FF1s+VrlqsXRRnc2z7ne/k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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA//r/AVCPYPug/MlQAAAAAElFTkSuQmCC"/>
                </defs>
              </svg>
            </span>
          </Box>
          <Flex>
            <Button as={Link} to="/login" variant="link" color="white" marginRight="20px"><h3>Login/Signup</h3></Button>
            <Button variant="link" color="white" marginRight="10px" onClick={handleClickCart}><h3>Cart</h3></Button>
          </Flex>
        </Flex>
        <br/>
        <br/>
        <br/>
        {/*<center><Text fontSize="3xl" fontWeight="bold">Home Page</Text></center>*/}
        <Box p={3} marginTop="-40px" marginLeft="85px">
          <Text fontSize="5xl" fontWeight="bold">Your one stop</Text>
          <Text fontSize="5xl" fontWeight="bold">for New Cars,</Text>
          <Text fontSize="5xl" fontWeight="bold">Service,</Text>
          <Text fontSize="5xl" fontWeight="bold">& Accessories</Text>
        </Box>
        <Box marginTop="-400px" marginLeft="55%" width="300px" height="300px" >
          <svg xmlns="http://www.w3.org/2000/svg" width="735px" height="500px" fill="none" viewBox="0 0 1170 769">
            <path fill="url(#e)" d="M520 113c126.749-126.75 332.251-126.75 459 0 126.75 126.75 126.75 332.251 0 459-126.749 126.75-332.251 126.75-459 0-126.75-126.749-126.75-332.25 0-459Zm421.638 421.638c106.112-106.115 106.112-278.161 0-384.275-106.115-106.115-278.161-106.115-384.276 0-106.114 106.114-106.114 278.16 0 384.275 106.115 106.115 278.161 106.115 384.276 0Z"/>
            <path fill="url(#f)" d="M0 0h1230v769H0V0Z"/>
            <defs>
              <linearGradient id="e" x1="1260.15" x2="258.334" y1="262.616" y2="883.984" gradientUnits="userSpaceOnUse">
                <stop stop-color="#000A61"/>
                <stop offset="1" stop-color="#A8A8A8"/>
              </linearGradient>
              <pattern id="f" width="1" height="1" patternContentUnits="objectBoundingBox">
                <use href="#g" transform="scale(.00158 .00253)"/>
              </pattern>
              <image id="g" width="632" height="395" data-name="subaru-impreza-wrx-sti-sports-car-2018-subaru-wrx-sti-subaru-removebg-preview.png" href="data:image/png;base64,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"/>
            </defs>
          </svg>
        </Box>
      </Box>

      {/* Filter cars */}
      <Flex justifyContent="center" alignItems="center" marginTop="-40px">
        <Box width="1000px" height="100px" bg="purple.800" borderRadius="xl">
          <FilterCarsSearch handleSearch={handleSearch} handleClear={handleClear} />
        </Box>
      </Flex>

      {message ? (
      <Box textAlign="center" color="white" mt="20px">
        {message}
      </Box>
      ) : (
        // if no error message, display cars
        <Flex flexDirection="column" alignItems="center" marginTop="-10px" marginBottom="20px">
          {rows.map((row, rowIndex) => (
            <Flex key={rowIndex} justifyContent="flex-start">
              {row.map((car, index) => (
                <Box key={index} marginRight={index === row.length - 1 ? 0 : "10px"} marginBottom="10px">
                  <CarDisplayBox car={car} />
                </Box>
              ))}
            </Flex>
          ))}
        </Flex>
      )}

      {/* Pagination */}
      <Box height="40px">
        <Flex justifyContent="center" alignItems="center">
          {[...Array(searchParams.make ? totalFilteredPages : totalPages).keys()].map((pageNumber) => (
            <Button
              key={pageNumber + 1}
              color="white"
              onClick={() => handlePageClick(pageNumber + 1)}
              variant="outline"
              ml={2}
              width="40px"
              disabled={pageNumber + 1 === currentPage}
            >
              {pageNumber + 1}
            </Button>
          ))}
        </Flex>
      </Box>
      <Footer marginTop='15px' />
    </>
  );
};

// this will be the homepage for when the user has logged in to their account
const SignedInHomepage = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate();
  const [showDashboardOptions, setShowDashboardOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);      // use states for pagination, set the current page
  const [totalPages, setTotalPages] = useState(1);        // use states for total number of pages
  const [allCars, setAllCars] = useState([]);             // use state for updating car data
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [message, setMessage] = useState('');
  const carsPerPage = 12;

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/', { replace: true });
  };

  const handleNavigateToModifyInfo = () => {
    navigate('/ModifyInfo', { state: { userData } });
  };

  const handleNavigateToPastPurchase = () => {
    navigate('/PastPurchase', { state: { userData } });
  };

  const handleNavigateToService = () => {
    navigate('/Service', { state: { userData } });
  };

  const handleNavigateToServiceHistory = () => {
    navigate('/ServiceHistory', { state: { userData } });
  };

  const handleNavigateToCarAccessories = () => {
    navigate('/CarAccessories', { state: { userData } });
  };

  const handleNavigateToCart = () => {
    navigate('/Cart', { state: { userData } });
  };

  const handleNavigateToAddownCar = () => {
    navigate('/OwnCar', { state: { userData } });
  };
  
  const handleNavigateToTestDrive = () => {
    navigate('/TestDriveHistory', { state: { userData } });
  };

  useEffect(() => {
    fetchCars(); // Fetch based on the current state
  }, [currentPage, searchParams]); 

  const fetchCars = async () => {
    let url = '/cars_details';
    let data;
  
    if (Object.keys(searchParams).length > 0) {
      // POST request to endpoint if filters are applied
      const response = await axios.post(url, { ...searchParams, page: currentPage, per_page: carsPerPage });
      data = response.data;
    } else {
      // GET request for getting all cars in the db
      const response = await axios.get(`${url}?page=${currentPage}&per_page=${carsPerPage}`);
      data = response.data;
    }
  
    // Update the cars state based on the response
    setAllCars(data.cars);
    setTotalPages(data.total_pages);
    setCurrentPage(data.current_page);
  
    // Check if any cars were found and set the message accordingly
    if (data.cars.length === 0) {
      setMessage("Sorry, no cars found.");  // if no cars found, show this
    } else {
      setMessage('');   // if cars found after error message, set error message to blank
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (filters) => {
    // set the page to 1 when applying filters
    setCurrentPage(1);
    setSearchParams(filters);
  };

  const handleClear = () => {
    setSearchParams({});  // clear all search parameters
    setCurrentPage(1);    // reset page to 1
  };

  const handleClickCart = () => {
    const confirmed = window.confirm('You need to be logged in. Proceed to login?');
    if (confirmed) {
      window.location.href = '/login';
    }
  };

  const carsToDisplay = filteredCars.length > 0 ? filteredCars : allCars;

  // get the total number of pages based on the amount of filtered cars found
  const totalFilteredPages = Math.ceil(filteredCars.length / carsPerPage);

  // splits the cars into appropriate rows (4 in this case)
  const rows = [];
  for (let i = 0; i < carsToDisplay.length; i += 4) {
    const row = carsToDisplay.slice(i, i + 4);
    rows.push(row);
  }

  return (
    <>
      <Box bg='black' w='100%' h='100vh' position='fixed' zIndex='-1' /> {/* black background */}

      {/* this will be the gradient box */}
      <Box
        bg='black'
        w='100%'
        color='white'
        height="400px"
        bgGradient="linear(to-b, black, gray.600)"
        borderBottomLeftRadius="xl"
        borderBottomRightRadius="xl"
      >
        {/* this will be the header with the logo and login, signup, and cart buttons */}
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold">{`Welcome, ${userData?.first_name}`}</Text>
          </Box>
          <Flex>
            <Button variant="link" color="white" marginRight="10px" onClick={handleSignOut}>Sign Out</Button>
            <Button variant="link" color="white" marginRight="10px" onClick={() => setShowDashboardOptions(!showDashboardOptions)}>Dashboard</Button>
            <Button variant="link" color="white" marginRight="10px" onClick={handleNavigateToCart}>Cart</Button>
          </Flex>
        </Flex>

        <Box p={3} marginTop="-10px" marginLeft="85px">
          <Text fontSize="3xl" fontWeight="bold">Your one stop</Text>
          <Text fontSize="3xl" fontWeight="bold">for New Cars,</Text>
          <Text fontSize="3xl" fontWeight="bold">Service,</Text>
          <Text fontSize="3xl" fontWeight="bold">& Accessories</Text>
        </Box>
      </Box>

      {/* sidebar with dashboard options */}
      {showDashboardOptions && (
        <Box
          bg="gray.800"
          color="white"
          w="300px"
          h="100vh"
          position="fixed"
          right="0"
          top="0"
          zIndex="10"
          paddingTop="60px"
        >
          <Flex flexDirection="column" alignItems="flex-start" p={4}>
            <Button
              variant="ghost"
              color="red"
              marginBottom="10px"
              onClick={() => setShowDashboardOptions(false)}
            >Close Dashboard</Button>
            <Button variant="ghost" color="white" marginBottom="10px" onClick={handleNavigateToModifyInfo} >Modify Personal Information</Button>
            <Button variant="ghost" color="white" marginBottom="10px" onClick={handleNavigateToPastPurchase}>Past Purchase</Button>
            <Button variant="ghost" color="white" marginBottom="10px" onClick={handleNavigateToService}>Schedule Service Appointment</Button>
            <Button variant="ghost" color="white" marginBottom="10px" onClick={handleNavigateToServiceHistory}>View Service Status/History</Button>
            <Button variant="ghost" color="white" marginBottom="10px" onClick={handleNavigateToAddownCar}>Add own car </Button>
            <Button variant="ghost" color="white" marginBottom="10px" onClick={handleNavigateToCarAccessories}>View Additional Accessories</Button>
            <Button variant="ghost" color="white" marginBottom="10px" onClick={handleNavigateToTestDrive}>View Test Drive Appointment</Button>
            <Button variant="ghost" color="white" marginBottom="10px">Manage Offers</Button>
          </Flex>
        </Box>
      )}

      {/* Filter cars */}
      <Flex justifyContent="center" alignItems="center" marginTop="-40px">
        <Box width="1000px" height="100px" bg="purple.800" borderRadius="xl">
          <FilterCarsSearch handleSearch={handleSearch} handleClear={handleClear} />
        </Box>
      </Flex>

      {message ? (
      <Box textAlign="center" color="white" mt="20px">
        {message}
      </Box>
      ) : (
        // if no error message, display cars
        <Flex flexDirection="column" alignItems="center" marginTop="-10px" marginBottom="20px">
          {rows.map((row, rowIndex) => (
            <Flex key={rowIndex} justifyContent="flex-start">
              {row.map((car, index) => (
                <Box key={index} marginRight={index === row.length - 1 ? 0 : "10px"} marginBottom="10px">
                  <CarDisplayBox car={car} />
                </Box>
              ))}
            </Flex>
          ))}
        </Flex>
      )}

      {/* Pagination */}
      <Box height="40px">
        <Flex justifyContent="center" alignItems="center">
          {[...Array(searchParams.make ? totalFilteredPages : totalPages).keys()].map((pageNumber) => (
            <Button
              key={pageNumber + 1}
              color="white"
              onClick={() => handlePageClick(pageNumber + 1)}
              variant="outline"
              ml={2}
              width="40px"
              disabled={pageNumber + 1 === currentPage}
            >
              {pageNumber + 1}
            </Button>
          ))}
        </Flex>
      </Box>
      <Footer marginTop='15px' />
    </>
  );
};

const TestDriveHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;
  const [driveHistory, setDriveHistory] = useState([]);

  const fetchTestDriveHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/test_drive_appointments/${userData.customer_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDriveHistory(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchTestDriveHistory();
  }, [userData]);

  const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
  };

  return (
    <>
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
      <Box
        bg='black'
        w='100%'
        color='white'
        height='100vh'
        bgGradient="linear(to-b, black, gray.600)"
        p={4}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="3xl" fontWeight="bold">Test Drive Appointments</Text>
        </Flex>

        {driveHistory.length === 0 ? (
          <Text mt={4} color="gray.400">You have no records.</Text>
        ) : (
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>Appointment ID</Th>
                <Th>Appointment date</Th>
                <Th>Status</Th>
                <Th>Car ID</Th>
                <Th>Car Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {driveHistory.map((test) => (
                <Tr key={test.appointment_id}>
                  <Td>{test.appointment_id}</Td>
                  <Td>{test.appointment_date}</Td>
                  <Td>{test.status}</Td>
                  <Td>{test.car_id}</Td>
                  <Td>{test.car_name}</Td>  
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </>
  );
};

const OwnCar = () => {
  const [formData, setFormData] = useState({ car_id: '', make: '', model: '' });
  const [customerCars, setCustomerCars] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [EditMessage, setEditMessage] = useState('');
  const userData = location.state?.userData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    fetch(`http://localhost:5000/add_own_car/${userData.customer_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('car added');
          setFormData({ car_id: '', make: '', model: '' });

          // Call the function to fetch and update customer cars
          fetchCustomerCars(userData.customer_id);
        } else {
          // Handle error cases
          console.log('Failed to add car');
          setEditMessage('Failed to add car VIN number for that car exists');
          setTimeout(() => {
            setEditMessage(null);
          }, 4000);
        }
      })
      .catch((error) => {
        console.log('Failed to add car');
        setEditMessage('Failed to add car VIN number for that car exists');
        setTimeout(() => {
          setEditMessage(null);
        }, 4000);
      });
  };

  const fetchCustomerCars = (customerId) => {
    fetch(`http://localhost:5000/own_cars/${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        setCustomerCars(data.cars);
      })
      .catch((error) => {
        console.error('Error fetching customer cars:', error);
      });
  };

  useEffect(() => {
    // Fetch customer cars based on customer_id
    if (userData && userData.customer_id) {
      fetchCustomerCars(userData.customer_id);
    }
  }, [userData]);


  const handleRemoveCar = (carId) => {
    fetch(`http://localhost:5000/delete_own_car/${carId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Car removed successfully');
          fetchCustomerCars(userData.customer_id);
        } else {
          console.log('Failed to remove car');
          
        }
      })
      .catch((error) => {
        console.log('Failed to remove car');
        
      });
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
  };

  return (
    <>
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
          <button className="nav-button" onClick={() => handleNavigate('/TestDriveHistory')}>
            Test Drive Status
          </button>
        </li>
      </ul>
    </nav>
      <Box
        bg='black'
        w='100%'
        color='white'
        height='100vh'
        bgGradient="linear(to-b, black, gray.600)"
        p={4}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="3xl" fontWeight="bold">Add Own Car</Text>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Box mt={8}>
          <Flex justifyContent="center">
            <Input
              placeholder="Car ID"
              name="car_id"
              value={formData.car_id}
              required
              onChange={handleInputChange}
              mb={4}
              style={{ width: '200px' }}
            /><br></br>
            <Input
              placeholder="Make"
              name="make"
              required
              value={formData.make}
              onChange={handleInputChange}
              mb={4}
              style={{ width: '200px' }}
            /><br></br>
            <Input
              placeholder="Model"
              name="model"
              required
              value={formData.model}
              onChange={handleInputChange}
              mb={4}
              style={{ width: '200px' }}
            /> <br></br>
            
            <Button type="submit" colorScheme="teal">
              Submit
            </Button><br></br>

            </Flex>
            {EditMessage && <p> {EditMessage}</p>}
          </Box>
        </form>
        <Box mt={8}>
          <Heading size="md">Customer own Cars</Heading>
          <VStack align="stretch" mt={4}>
            {customerCars.length > 0 ? (
              customerCars.map((car) => (
                <Box key={car.car_id} bg="gray.200" p={2} borderRadius="md">
                  <Text color="black">{`Car ID: ${car.car_id}`}</Text>
                 <Text color="black">{`Make: ${car.make}`}</Text>
                <Text color="black">{`Model: ${car.model}`}</Text>
                  <Button colorScheme="red" onClick={() => handleRemoveCar(car.car_id)}>Remove</Button>
                </Box>
              ))
            ) : (
              <Text>No cars added by this customer.</Text>
            )}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

const ServiceHistory = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const [serviceHistory, setServiceHistory] = useState([]);


  const fetchServiceHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/customer_service_requests/${userData.customer_id}`);
      const data = await response.json();
      setServiceHistory(data);
    } catch (error) {
      console.error('Error fetching service history:', error);
    }
  };

  useEffect(() => {
    fetchServiceHistory();
  }, [userData]);

  const navigate = useNavigate();  

  const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
  };

  return (
    <>
    <nav className="navbar">
      <ul className="nav-list">
      <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/homepage')}>
            Home
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
          <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/TestDriveHistory')}>
            Test Drive Status
          </button>
        </li>
        </li>
      </ul>
    </nav>
      <Box
        bg='black'
        w='100%'
        color='white'
        height='100vh'
        bgGradient="linear(to-b, black, gray.600)"
        p={4}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="3xl" fontWeight="bold">Service History</Text>
        </Flex>

        {serviceHistory.length === 0 ? (
          <Text mt={4} color="gray.400">There are no services at the moment.</Text>
        ) : (
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>Service Name</Th>
                <Th>Price</Th>
                <Th>Description</Th>
                <Th>Proposed Date</Th>
                <Th>Status</Th>
                <Th>Car ID</Th>
              </Tr>
            </Thead>
            <Tbody>
              {serviceHistory.map((service) => (
                <Tr key={service.service_request_id}>
                  <Td>{service.service_name}</Td>
                  <Td>${service.price}</Td>
                  <Td>{service.description}</Td>
                  <Td>{service.proposed_datetime}</Td>
                  <Td>{service.status}</Td>
                  <Td>{service.car_id}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </>
  );
};


const CustomerCart = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const customer_id = userData?.customer_id;
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    fetchCartItems(userData?.customer_id);
  }, [userData]);

  const fetchCartItems = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:5000/get_cart_items/${customerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();
      setCartItems(data.cart_items);
      setError(null);
      calculateTotalPrice(data.cart_items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('Error fetching cart items. Please try again later.');
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + parseFloat(item.item_price), 0);
    setTotalPrice(total);
  };
//modified to send  car_id also in order to delete the car along with it perks
  const handleRemoveItem = async (cartId,car_id,service_package_id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete_cart_item/${cartId}` + (car_id ? `/${car_id}` : '/0')
       +(service_package_id ? `/${service_package_id}` : '/0') + `/${customer_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      
      setCartItems(prevCartItems => prevCartItems.filter(item => item.car_id && service_package_id ===null? item.car_id !== car_id :item.cart_id !== cartId ) );
      calculateTotalPrice(cartItems.filter(item => item.car_id && service_package_id===null? item.car_id !== car_id :item.cart_id !== cartId ));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Error removing item from cart. Please try again later.');
    }
  };
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
//IDENT PERKS UNDER ASSOCIATED CAR
  const indentPerks = (service_package_id) => {
    return  service_package_id ? { marginLeft:"30px"} : {};
};

const handleNavigate = (path) => {
  navigate(path, { state: { userData } });
};


  return (
  <>
 
    <Box bg='black' w='100%' color='white' minHeight='100vh' bgGradient="linear(to-b, black, gray.600)">
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
          <button className="nav-button" onClick={() => handleNavigate('/PastPurchase')}>
            Past Purchase
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/OwnCar')}>
            Own Car
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/TestDriveHistory')}>
            Test Drive Status
          </button>
        </li>
      </ul>
    </nav>
      <Flex justifyContent="space-between" alignItems="center" p={4}>
        <Text fontSize="3xl" fontWeight="bold" color="white">Cart</Text>
        <Text color="white">{`Customer ID: ${userData.customer_id}`}</Text>
        <Text color="white">{`Name: ${userData.first_name}`}</Text>
      </Flex>

      <Box pt={20} pb={20} overflowY="auto">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <Flex key={item.cart_id} alignItems="center" justify="space-between" mb={4} sx={indentPerks(item.service_package_id)}>
                <Box onClick={() => handleImageClick(item.item_image)}>
                  <Image src={item.item_image} alt={item.item_name} boxSize="50px" cursor="pointer" />
                </Box>
                <Box ml={4}>
                  <Text color="white">{item.item_name}</Text>
                  <Text color="white">${item.item_price}</Text>
                </Box>
                <Button colorScheme="red" onClick={() => handleRemoveItem(item.cart_id, item.car_id, item.service_package_id)}>Remove</Button>
              </Flex>
            ))}
            <Text fontSize="2xl" fontWeight="bold">
              Total Price: ${totalPrice.toFixed(2)}
            </Text>
            <Button mt={4} colorScheme="blue">Checkout</Button>
          </>
        ) : (
          <Text color="White">No items in the cart.</Text>
        )}
      </Box>

      <Modal isOpen={selectedImage !== null} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalBody p={0}>
            <Image src={selectedImage} alt="Large Image" />
            <ModalCloseButton color="white" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
    </>
  );
};
//CustomerSerivceAppointment

const CustomerSerivceAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
  const [EditMessage, setEditMessage] = useState('');
  const [vinNumbers, setVinNumbers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [vinNumber, setVinNumber] = useState('');

  // Fetch services from the endpoint
  useEffect(() => {
    fetch('http://localhost:5000/services-offered', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setServices(data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch VIN numbers from both endpoints and merge them
    Promise.all([
      fetch(`http://localhost:5000/car_sold/${userData.customer_id}`, {
        method: 'GET',
      }).then(response => response.json()),
      fetch(`http://localhost:5000/own_cars/${userData.customer_id}`, {
        method: 'GET',
      }).then(response => response.json()),
    ])
      .then(([carSoldData, ownCarsData]) => {
        let carSoldVinNumbers = [];
        let ownCarsVinNumbers = [];

        // Extract VIN numbers from carSoldData array
        if (Array.isArray(carSoldData)) {
          carSoldVinNumbers = carSoldData.map(item => item.item_id);
        }

        // Extract VIN numbers from ownCarsData object
        if (ownCarsData && ownCarsData.cars && Array.isArray(ownCarsData.cars)) {
          ownCarsVinNumbers = ownCarsData.cars.map(car => car.car_id);
        }

        const combinedVinNumbers = [...carSoldVinNumbers, ...ownCarsVinNumbers];
        setVinNumbers(combinedVinNumbers);
      })
      .catch(error => {
        console.error('Error fetching VIN numbers:', error);
      });
  }, [userData.customer_id]);

  const handleSubmit = e => {
    e.preventDefault();
    const formattedDate = `${selectedDate} ${selectedTime}:00`;

    const formData = {
      customer_ID: userData.customer_id,
      service_offered: selectedService,
      car_id: vinNumber,
      proposed_datetime: formattedDate,
    };
    
    fetch('http://localhost:5000/service-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setEditMessage('Submission went through');
        setTimeout(() => {
          setEditMessage(null);
        }, 4000);
        resetForm();
      })
      .catch(error => {
        console.error('Error:', error);
        setEditMessage('Submission did not go through');
        setTimeout(() => {
          setEditMessage(null);
        }, 4000);
      });

    const resetForm = () => {
      setSelectedService('');
      setSelectedDate('');
      setSelectedTime('');
      setVinNumber('');
    };
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
  };

  return (
    <>
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
        <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/TestDriveHistory')}>
           Test Drive Status
          </button>
        </li>
      </ul>
    </nav>
      <Box
        bg='black'
        w='100%'
        color='white'
        height='100vh'
        bgGradient="linear(to-b, black, gray.600)"
        display="flex"
        alignItems="center" 
        justifyContent="center"
      >
        <Box mx="auto" maxW="400px">
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px' }}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color='black' marginTop='-20px'>Schedule Service Appointment</Text>
            </Box>
            <form onSubmit={handleSubmit}>
              <label htmlFor="Service" style={{ color: 'black' }}>Service</label>
              <Select
                id="Service"
                placeholder="Select Service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                mb={4}
                style={{ color: 'black' }}
              >
                {services.map(service => (
                  <option key={service.services_offered_id} value={service.services_offered_id}>
                    {service.name} - ${service.price}
                  </option>
                ))}
              </Select>

              <label htmlFor="datePicker" style={{ color: 'black' }}>Select Date:</label>
              <Input
                type="date"
                id="datePicker"
                placeholder="Select Date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                mb={4}
                style={{ color: 'black' }}
              />
              <label htmlFor="time" style={{ color: 'black' }}>Select Time:</label>
              <Input
                type="time"
                id="time"
                placeholder="Select Time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                mb={4}
                style={{ color: 'black' }}
              />
              <label htmlFor="vin" style={{ color: 'black' }}>VIN Number of Car bought (If any)</label>

              <Select
                id="vin"
                placeholder="VIN Number"
                value={vinNumber}
                onChange={(e) => setVinNumber(e.target.value)}
                mb={4}
                style={{ color: 'black' }}
              >
                {vinNumbers.length === 0 && <option disabled>No VINs available</option>}
                {vinNumbers.map(vin => (
                  <option key={vin} value={vin} disabled={vinNumbers.length === 0}>
                    {vin}
                  </option>
                ))}
              </Select>
              <Button type="submit" colorScheme="blue">Submit</Button>
              {EditMessage && <p style={{ color: 'black' }}>{EditMessage}</p>}
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

const PastPurchase = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate();
  const [itemsSold, setItemsSold] = useState([]);

  useEffect(() => {
    const fetchItemsSold = async () => {
      try {
        const response = await fetch(`http://localhost:5000/items-sold/${userData?.customer_id}`);
        if (response.ok) {
          const data = await response.json();
          setItemsSold(data);
        } else {
          throw new Error('Failed to fetch items sold');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchItemsSold();
  }, [userData]);

  const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
  };

  return (
    <>
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
          <button className="nav-button" onClick={() => handleNavigate('/OwnCar')}>
            Own Car
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/TestDriveHistory')}>
            Test Drive Status
          </button>
        </li>
      </ul>
    </nav>
      <Box
        bg='black'
        w='100%'
        color='white'
        height='100vh'
        bgGradient="linear(to-b, black, gray.600)"
      >
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold">Past Purchase</Text>
          </Box>
        </Flex>

        {itemsSold.length === 0 ? (
          <Box p={4}>
            <Text>No purchases right now.</Text>
          </Box>
        ) : (
          <Table variant="striped" colorScheme="black">
            <Thead>
              <Tr>
                <Th>Item Sold ID</Th>
                <Th>Customer ID</Th>
                <Th>Item Type</Th>
                <Th>Date</Th>
                <Th>Price</Th>
                <Th>Item ID</Th>
                <Th>Method of Payment</Th>
              </Tr>
            </Thead>
            <Tbody>
              {itemsSold.map(item => (
                <Tr key={item.item_sold_id}>
                  <Td>{item.item_sold_id}</Td>
                  <Td>{item.customer_id}</Td>
                  <Td>{item.item_type}</Td>
                  <Td>{item.date}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.item_id}</Td>
                  <Td>{item.method_of_payment}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </>
  );
}

const CarAccessories = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const [accessories, setAccessories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddAccessoryModal, setShowAddAccessoryModal] = useState(false);
  const [accessoryData, setAccessoryData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [cartData, setCartData] = useState({
    customer_id: "",
    item_price: "",
    item_image: "",
    item_name: "",
    accessoire_id: "",
  });

  const fetchAccessories = async (category) => {
    try {
      const response = await fetch(`http://localhost:5000/accessories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }),
      });
      const data = await response.json();
      console.log("data collect", data)
      setAccessories(data);
    } catch (error) {
      console.error('Error fetching accessories:', error);
    }
  };

  const handleDeleteAccessory = async (accessoryID) => {
    console.log("the ID recieved: ", accessoryID) // testing that we recieved the accessory_id to be deleted
    try {
      const response = await fetch(`http://localhost:5000/deleteAccessory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessoryID }),
      });
      const data = await response.json();
      console.log("data collect", data)
      // If deletion was successful, refetch the accessories data
      if (response.ok) {
        fetchAccessories(selectedCategory);
      }
    } catch (error) {
      console.error('Error fetching accessories:', error);
    }
  };

  const handleAddAccessory = async () => {
    try {
      // Add logic to send accessoryData to backend and handle addition
      console.log("Accessory data:", accessoryData); // Log the accessoryData
      const response = await fetch(`http://localhost:5000/addAccessory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({accessoryData}), // Send accessoryData in the request body
      });
      const data = await response.json();
      console.log("Response dataaaa:", data);
      // If addition was successful, refetch the accessories data
      if (response.ok) {
        fetchAccessories(selectedCategory);
      } else {
        throw new Error(data.error || 'Failed to add accessory');
      }
    } catch (error) {
      console.error('Error adding accessory:', error);
      // Handle error (e.g., display error message to the user)
    } finally {
      // Close the modal after adding accessory (whether successful or not)
      setShowAddAccessoryModal(false);
    }
  };

  const handleCart = async () =>{
    try {
      // Add logic to send accessoryData to backend and handle cart
      console.log("Accessory data:", cartData); // Log the cartData
      const response = await fetch(`http://localhost:5000/addAccessoryToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartData: {
            customer_id: cartData.customer_id,
            item_price: cartData.item_price,
            item_image: cartData.item_image,
            item_name: cartData.item_name,
            accessoire_id: cartData.accessoire_id,
          }
        }), // Send cartData in the request body
      });
      const data = await response.json();
      console.log("Response dataaaa:", data);
      // If addition was successful, refetch the accessories data
      if (response.ok) {
        fetchAccessories(selectedCategory);
      } else {
        throw new Error(data.error || 'Failed to add accessory');
      }
    } catch (error) {
      console.error('Error adding accessory:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);  
  };

  const handleButtonClick = () => {
    fetchAccessories(selectedCategory);
  };

  const handleAddAccessoryButton = () => {
    setShowAddAccessoryModal(true);
  };

  const handleAddAccessoryModalClose = () => {
    setShowAddAccessoryModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccessoryData({ ...accessoryData, [name]: value });
  };

  const handleAddToCart = (accessory) => {
    const name = accessory.name;
    const accessoire_id = accessory.accessoire_id;
    const price = accessory.price;
    const image = accessory.image;
    const customer_id = userData?.customer_id;
  
    // Destructure and update existing properties
    setCartData((prevCartData) => ({
      ...prevCartData,
      customer_id,
      item_price: price,
      item_image: image,
      item_name: name,
      accessoire_id,
    }));

    //handleCart();
  };

  useEffect(() => {
    const handleAddToCart = async () => {
      if (cartData.customer_id && cartData.item_price && cartData.item_image && cartData.item_name && cartData.accessoire_id) {
        try {
          const response = await fetch(`http://localhost:5000/addAccessoryToCart`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cartData: {
                customer_id: cartData.customer_id,
                item_price: cartData.item_price,
                item_image: cartData.item_image,
                item_name: cartData.item_name,
                accessoire_id: cartData.accessoire_id,
              },
            }),
          });
  
          const data = await response.json();
          console.log("Backend response:", data);
  
          // Handle successful response (e.g., update UI, show confirmation message)
        } catch (error) {
          console.error('Error adding accessory:', error);
          // Handle errors (e.g., display error message to user)
        }
      }
    };
  
    handleAddToCart();
  }, [cartData]);

  const navigate = useNavigate();  

const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
  };

  return (
    <>
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
        <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/TestDriveHistory')}>
            Test Drive Status
          </button>
        </li>
      </ul>
    </nav>
    <Box
      bg='black'
      w='100%'
      color='white'
      height='100vh'
      bgGradient="linear(to-b, black, gray.600)"
      >
      <Text fontSize="3xl" fontWeight="bold" textAlign="center">
        Accessories
      </Text>
      <FormControl mx="auto" my={4} w="max-content">
        <FormLabel>Category</FormLabel>
        <Select
        name="category"
        defaultValue=""
        onChange={handleSelectChange}
        color="black" 
        bg="white" 
        border="none"
        borderRadius="md" 
        boxShadow="sm" 
      >
          <option value="">Select a category...</option>
          <option value="car-mat">Car Mat</option>
          <option value="cover">Cover</option>
          <option value="wiper">Wiper</option>
          <option value="air-freshener">Air Freshener</option>
          <option value="dash-cam">Dash Cam</option>
        </Select>
      </FormControl>
      <Button onClick={handleButtonClick} colorScheme="blue" ml="40%" marginTop="-20px">
        Fetch Accessories
      </Button>
      <Button onClick={handleAddAccessoryButton} colorScheme="blue" mx="auto" mt={4} mb={8}>
        Add Accessories
      </Button>
      {/* Add Accessory Modal */}
      <Modal isOpen={showAddAccessoryModal} onClose={handleAddAccessoryModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >Add Accessory</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel color="black" >Name</FormLabel>
              <Input type="text" name="name" value={accessoryData.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="black" >Description</FormLabel>
              <Input type="text" name="description" value={accessoryData.description} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="black" >Price</FormLabel>
              <Input type="number" name="price" value={accessoryData.price} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="black" >Image URL</FormLabel>
              <Input type="text" name="image" value={accessoryData.image} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="black" >Category</FormLabel>
              <Select name="category" value={accessoryData.category} onChange={handleInputChange}>
                <option value="">Select a category...</option>
                <option value="car-mat">Car Mat</option>
                <option value="cover">Cover</option>
                <option value="wiper">Wiper</option>
                <option value="air-freshener">Air Freshener</option>
                <option value="dash-cam">Dash Cam</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddAccessory}>
              Add
            </Button>
            <Button onClick={handleAddAccessoryModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {accessories.length > 0 && (
  <Table variant="default" colorScheme="blue" mx="auto" w="max-content">
    <Thead>
      <Tr>
        <Th>Accessory ID</Th>
        <Th>Name</Th>
        <Th>Description</Th>
        <Th>Price</Th>
        <Th>Image</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      {accessories.map((accessory, index) => (
        <Tr key={index}>
          <Td>{accessory.accessoire_id}</Td>
          <Td>{accessory.name}</Td>
          <Td>{accessory.description}</Td>
          <Td>{accessory.price}</Td>
          {/* <Td>{accessory.image}</Td> */}
          {/* <Td><img src={accessory.image} alt={accessory.name || "Accessory Image"} /></Td> */}
          <Td><Image src={accessory.image} alt="Large Image"/></Td>
          <Td><Button onClick={() => handleAddToCart(accessory)}>Add to Cart</Button></Td>
          {/* <Td><Button onClick={() => handleDeleteAccessory(accessory.accessoire_id)}>Delete</Button></Td> */}
          {/* <Td><Button onClick={() => handleDeleteAccessory(accessory.accessoire_id)}>Delete</Button></Td> */}
          {/* assuming you got to this page through manager_login <Td>{userData?.manager_id && (<Button>Delete</Button>)}</Td> */}
        </Tr>
      ))}
    </Tbody>
  </Table>
)}
    </Box>
    </>
  );
};

const CustomerModifyInfo = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate();
  const [EditMessage, setEditMessage] = useState('');

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/', { replace: true });
  };

  const [editedData, setEditedData] = useState({
    first_name: userData?.first_name || '',
    last_name: userData?.last_name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    Address: userData?.Address || '',
    password: userData?.password || '',
    usernames: userData?.usernames || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/edit-customer/${userData?.customer_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      const data = await response.json();
      console.log(data);
      setEditMessage('Edit successful');
      setTimeout(() => setEditMessage(''), 4000);
    } catch (error) {
      console.error('Error:', error);
      setEditMessage('Edit not successful');
      setTimeout(() => setEditMessage(''), 4000);
    }
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
  };

  return (
    <>
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
        <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/TestDriveHistory')}>
            Test Drive Status
          </button>
        </li>  
      </ul>
    </nav>
    <Box
      bg='black'
      w='100%'
      color='white'
      height='100vh'
      bgGradient='linear(to-b, black, gray.600)'
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Flex direction="column" p={5} rounded="md" bg="white" height="95vh" shadow="sm" width="90%" maxWidth="500px" mx="auto" my={6} color="gray.800">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Text fontSize="xl" fontWeight="semibold">Modify Personal Information</Text>
        <Button variant="outline" colorScheme="blue" size="sm" onClick={handleSignOut}>Sign Out</Button>
      </Flex>

      <Text mb={5} fontSize="md" color="gray.600">Client ID: {userData?.customer_id}</Text>

      

      <form>
        <Flex direction={{ base: "column", sm: "row" }} wrap="wrap" mb={4}>
          {/* First and Last Name */}
          <FormControl pr={{ base: 0, sm: 2 }} mb={{ base: 4, sm: 0 }} flex="1">
            <FormLabel htmlFor='first_name' color='black'>First Name</FormLabel>
            <Input id='first_name' type='text' name='first_name' color='red' value={editedData.first_name} onChange={handleInputChange} isReadOnly />
          </FormControl>
          <FormControl pl={{ base: 0, sm: 2 }} flex="1">
            <FormLabel htmlFor='last_name' color='black'>Last Name</FormLabel>
            <Input id='last_name' type='text' name='last_name' color='red' value={editedData.last_name} onChange={handleInputChange} isReadOnly />
          </FormControl>
        </Flex>

        <Flex direction={{ base: "column", sm: "row" }} wrap="wrap" mb={4}>
          {/* User Name and Email */}
          <FormControl pr={{ base: 0, sm: 2 }} mb={{ base: 4, sm: 0 }} flex="1">
            <FormLabel htmlFor='usernames' color='black'>User Name</FormLabel>
            <Input id='usernames' type='text' name='usernames' value={editedData.usernames} onChange={handleInputChange} />
          </FormControl>
          <FormControl pl={{ base: 0, sm: 2 }} flex="1">
            <FormLabel htmlFor='email' color='black'>Email</FormLabel>
            <Input id='email' type='email' name='email' value={editedData.email} onChange={handleInputChange} />
          </FormControl>
        </Flex>

        <Flex direction={{ base: "column", sm: "row" }} wrap="wrap" mb={4}>
          {/* Phone and Address */}
          <FormControl pr={{ base: 0, sm: 2 }} mb={{ base: 4, sm: 0 }} flex="1">
            <FormLabel htmlFor='phone' color='black'>Phone</FormLabel>
            <Input id='phone' type='tel' name='phone' value={editedData.phone} onChange={handleInputChange} />
          </FormControl>
          <FormControl pl={{ base: 0, sm: 2 }} flex="1">
            <FormLabel htmlFor='Address' color='black'>Address</FormLabel>
            <Input id='Address' type='text' name='Address' value={editedData.Address} onChange={handleInputChange} />
          </FormControl>
        </Flex>

        {/* Password (Kept alone due to sensitivity) */}
        <FormControl mb={4}>
          <FormLabel htmlFor='password' color='black'>Password</FormLabel>
          <Input id='password' type='password' name='password' value={editedData.password} onChange={handleInputChange} />
        </FormControl>

        {EditMessage && <Text color="red.500" mb={3}>{EditMessage}</Text>}
        <Button colorScheme='blue' width="20%" onClick={handleEdit}>Save</Button>
      </form>
    </Flex>
    </Box>
    </>
  );
};

const Login = () => {
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [showCreateCustomerForm, setShowCreateCustomerForm] = useState(false);
  const [EditMessage, setEditMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreateCustomerClick = () => {
    setShowCreateCustomerForm(!showCreateCustomerForm);
    setShowCreateUserForm(false); // Hide the create user form if visible
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:5000/login_customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
       const previousUrl = location.state?.previousUrl;
       const car_id = location.state?.car_id;
        previousUrl ? navigate(previousUrl, { state: { car_id: car_id, userData: data } }) : navigate('/homepage', { state: { userData: data } });
        
// Reset form state and collapse sign-up form
        setShowCreateCustomerForm(false);
        setShowCreateUserForm(false);
      } else {
        console.error('Login failed:', data.error);
        setEditMessage('Login failed');
        setTimeout(() => {
          setEditMessage(null);
        }, 4000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateCustomerSubmit = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm('Are you sure you want to create this customer?');

    if (!confirmed) {
      setEditMessage('Customer creation canceled');
      setTimeout(() => {
        setEditMessage(null);
      }, 2000);
      return; 
    }
    
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    console.log('New Customer Data:', customerData);

    try {
      const response = await fetch('http://localhost:5000/add_customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      if (response.ok) {
        console.log('Customer added successfully');
        setEditMessage('Customer was created successfully');
        setTimeout(() => {
          setEditMessage(null);
        }, 2000);
// Reset form state and collapse sign-up form
        setShowCreateCustomerForm(false);
        setShowCreateUserForm(false);
      } else {
        console.error('Failed to add customer');
        setEditMessage('Customer was not created successfully');
        setTimeout(() => {
          setEditMessage(null);
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='master-form-container' style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: "linear-gradient(0deg, #222, #000)",
    }}>
      <div className="form-div" style={{
        width: '80%',
        maxWidth: '800px',
        padding: '20px',
        border: '1px none black',
        borderRadius: '35px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <h2 className="form-title">Login</h2>
          <div className="form-group">
            <label htmlFor="usernames">User Name:</label>
            <input type="text" id="usernames" name="usernames" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button className="login-button" type="submit">Login</button>
          {EditMessage && <p> {EditMessage}</p>}
        </form>
        <Button as={Link} to="/Roles_login" style={{ padding: '10px 20px', backgroundColor: 'black', color: '#fff', border: '1px solid black', borderRadius: '3px', cursor: 'pointer' }} marginLeft="600px">Adminstration login</Button>
        <button onClick={handleCreateCustomerClick} style={{ padding: '10px 20px', backgroundColor: 'black', color: '#fff', border: '1px solid black', borderRadius: '3px', cursor: 'pointer' }}>
          {showCreateCustomerForm ? 'Cancel' : 'Sign-Up Instead?'}
        </button>
        {showCreateCustomerForm && (
          <form className="create-customer-form" onSubmit={handleCreateCustomerSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input type="text" id="first_name" name="first_name" required />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input type="text" id="last_name" name="last_name" required />
            </div>
            <div className="form-group">
              <label htmlFor="usernames">User Name:</label>
              <input type="text" id="usernames" name="usernames" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="Address">Address:</label>
              <input type="text" id="Address" name="Address" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'black', color: '#fff', border: '1px solid black', borderRadius: '3px', cursor: 'pointer' }}>Submit</button>
            {EditMessage && <p>{EditMessage}</p>}
          </form>
        )}
      </div>
      <div className='circle-top-left'></div>
      <div className='circle-bottom-right'></div>
    </div>
  );
};

const Roles_login = () => {

  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [manager, setManager] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [tech, setTech] = useState(null);
  const [EditMessage, setEditMessage] = useState('');


  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      let url = '';
      let setData = null;
      let nextPage = '';
      switch (role) {
        case 'Manager':
          url = 'http://localhost:5000/login_managers';
          setData = setManager;
          nextPage = '/Manager';
          break;
        case 'Admin':
          url = 'http://localhost:5000/login_admin';
          setData = setAdmin;
          nextPage = '/admin';
          break;
        case 'Technicians':
          url = 'http://localhost:5000/login_technicians';
          setData = setTech;
          nextPage = '/tech';
          break;
        default:
          console.error('Invalid role selected');
          return;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        setData(data);
        navigate(nextPage, { state: { userData: data } });
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='master-form-container' style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh', /* Set the minimum height of the div to 100% of the viewport height */
      background: "linear-gradient(0deg, #222, #000)", /* Set the background color of the whole page to black */
    }}>
      <div className="form-div" style={{
        width: '80%', // Set the width of the div to be very wide
        maxWidth: '800px', // Set a maximum width for the div
        padding: '20px',
        border: '1px none black',
        borderRadius: '35px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)', /* Set the background color of the div to white */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content horizontally
        gap: '20px', // Add gap between child elements
      }}>
        <div className="role-selection">
          <button onClick={() => handleRoleSelection('Manager')}>Manager</button> &nbsp;&nbsp;
          <button onClick={() => handleRoleSelection('Admin')}>Admin</button>&nbsp;&nbsp;
          <button onClick={() => handleRoleSelection('Technicians')}>Technician</button>&nbsp;&nbsp;
        </div>
        {role && (


          <form className="login-form" onSubmit={handleLoginSubmit}>
            <center><h3 style={{ fontSize: '20px', color: 'white' }} >{role} Form</h3></center>


            <div className="form-group">
            <label htmlFor="usernames">User Name:</label>
            <input type="text" id="usernames" name="usernames" required />
          </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button className="login-button" type="submit">Login</button>
          </form>
        )}
      </div>
      <div className='circle-top-left'></div>
      <div className='circle-bottom-right'></div>
    </div>
  );

}

// component to handle when the user clicks on "service appointment requests"
const handleAppointmentRequests = () => {
  console.log('Service appointment requests clicked');
};

// component to handle when the user clicks on "add cars" button and selects a file
const HandleAddCars = ({managerId}) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // parse the information from the file entered
  const parseFileContent = (fileContent) => {
    const lines = fileContent.split('\n'); 
    const cars = [];
    lines.forEach((line) => {
        const [make, model, year, color, engine, transmission, price, ...images] = line.split(' ');  
        const imagesTrimmed = images.map(url => url.trim());  // ensure no whitespace or other characters affect parsed file
        const car = {
            manager_id: managerId,
            make: make,
            model: model,
            year: parseInt(year),
            color: color,
            engine: engine,
            transmission: transmission,
            price: price,
            image0: imagesTrimmed[0], 
            image1: imagesTrimmed[1],
            image2: imagesTrimmed[2],
            image3: imagesTrimmed[3],
            image4: imagesTrimmed[4]
        };
        cars.push(car);
    });
    return cars;
  };

  // when user enters file, display filename 
  const handleFileInputChange = (event) => {
    setErrorMessage(''); // Reset error message when file input changes
    setSuccessMessage(''); // Reset success message when file input changes
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;
            console.log('File Content', fileContent);

            // parse the file and show results of parse in console log
            const cars = parseFileContent(fileContent);
            console.log('Parsed Cars', cars);

            // send parsed info to backend
            sendCars(cars);
        };

        reader.readAsText(file);
    }
  };

  // function that sends the parsed data from the file to the backend
  const sendCars = (cars) => {
    console.log('Sending cars data to backend:', cars);   // ensure proper data is being sent beforehand
    fetch('/add_cars_to_site', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cars })  // ensure data is being converted to JSON
    })
    .then(response => {
      if (response.ok) {
        console.log('Cars added successfully');
        setSuccessMessage('Cars added successfully!');
      } else {
        console.error('Failed to add cars:', response.statusText);
        setErrorMessage('Failed to add cars. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    });
};

return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "300px", marginTop: "-375px"}}>
      <div>
          <Text fontWeight="bold" color="white" fontSize="4xl">Select a file to add cars</Text>
          <input justifyContent="center" type="file" onChange={handleFileInputChange} style={{ color: 'white', marginTop:"30px", marginLeft: "90px" }} />
          {successMessage && <p style={{ color: 'green',  marginLeft: '60px', marginTop: '10px' }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: 'red', marginLeft: '20px', marginTop: '10px' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

// component for displaying the manager dashboard ui
const Manager = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate();
  const [showTechnicianForm, setShowTechnicianForm] = useState(false);
  const [showAddCars, setShowAddCars] = useState(false);
  const [showRemoveCars, setShowRemoveCars] = useState(false);
  const [showRemoveMiscellaneous, setShowRemoveMiscellaneous] = useState(false);
  const [showServiceRequests, setShowServiceRequests] = useState(false);
  const [accountCreationSuccess, setAccountCreationSuccess] = useState(false);
  const [technicianFormData, setTechnicianFormData] = useState({
    firstName: '',  
    lastName: '',  
    email: '',
    username: '',
    phone: '',
    password: '',
    manager_id: userData.manager_id
  });
  const [removeCarFormData, setRemoveCarFormData] = useState({
    car_id: ''
  });
  const [serviceRequests, setServiceRequests] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (showServiceRequests) {
      fetchServiceRequests();
    }
  }, [showServiceRequests]);

  const handleAccept = (serviceRequestId) => {
    const updatedRequest = {
      status: 'accepted'
    };
  
    axios.patch(`/update_customer_service_requests/${serviceRequestId}`, updatedRequest)
      .then(response => {
        // Update UI if necessary
        console.log('Service request accepted:', response.data);
        fetchServiceRequests();
      })
      .catch(error => {
        console.error('Error accepting service request:', error);
      });
  };
  
  const handleDecline = (serviceRequestId) => {
    const updatedRequest = {
      status: 'declined'
    };
  
    axios.patch(`/update_customer_service_requests/${serviceRequestId}`, updatedRequest)
      .then(response => {
        // Update UI if necessary
        console.log('Service request declined:', response.data);
        fetchServiceRequests();
      })
      .catch(error => {
        console.error('Error declining service request:', error);
      });
  };

  const fetchServiceRequests = () => {
    axios.get('/show_customer_service_requests/')
        .then(response => {
          setServiceRequests(response.data);
        })
        .catch(error => {
          console.error('Error fetching service requests:', error);
        });
  };

  // handler to toggle technician form visibility
  const handleSubmitTechnicianForm = (event) => {
    event.preventDefault();
    const formData = {
      ...technicianFormData,
      manager_id: userData.manager_id 
    };
  
    axios.post('/add_technician', formData)
      .then(response => {
        console.log('Technician added successfully');
        setTechnicianFormData({  // Reset all form fields to blank
          firstName: '',  
          lastName: '',  
          email: '',
          username: '',
          phone: '',
          password: ''
        });
        setAccountCreationSuccess(true); // Set account creation success state to true

        setTimeout(() => {
          setAccountCreationSuccess(false); // Hide the success message after 3 seconds
        }, 3000);
      })
      .catch(error => {
        console.error('Error adding technician:', error);
      });
  };

  const handleSubmitRemoveCarForm = async (event) => {
    event.preventDefault();
    const carId = parseInt(removeCarFormData.car_id);
    if (isNaN(carId)) {
      setError('Car ID must be an integer');
      return;
    }
    console.log("the car id is", removeCarFormData.car_id);
    try {
        const response = await fetch(`http://localhost:5000/remove_car`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(removeCarFormData), // Sending formData in the request body
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log("Car removed successfully:", data);
            // Optionally, you can update the UI or show a success message here
        } else {
            console.error('Error removing car:', response.statusText);
            // Handle the error, show an error message to the user, etc.
        }
    } catch (error) {
        console.error('Error sending data:', error);
        // Handle network errors, display error message, etc.
    }
    // Reset error state
    setError(null);
  };

  const handleSubmitMiscellaneousForm = async (event) => {
    event.preventDefault();
    const carId = parseInt(removeCarFormData.car_id);
    if (isNaN(carId)) {
      setError('Car ID must be an integer');
      return;
    }
    console.log("the car id is", removeCarFormData.car_id);
    try {
        const response = await fetch(`http://localhost:5000`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(removeCarFormData), // Sending formData in the request body
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log("Car removed successfully:", data);
            // Optionally, you can update the UI or show a success message here
        } else {
            console.error('Error removing car:', response.statusText);
            // Handle the error, show an error message to the user, etc.
        }
    } catch (error) {
        console.error('Error sending data:', error);
        // Handle network errors, display error message, etc.
    }
    // Reset error state
    setError(null);
  };


  // when manager clicks on sign out, gets redirected to the homepage
  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/', { replace: true });
  };

  // function that handles service appointment requests when the user clicks the button
  const handleAppointmentRequests = () => {
  };

  // when user clicks on create technician, show the relevant form immediately
  const handleCreateTechnician = () => {
    setShowTechnicianForm(true);
  };

  // ensures that when a button is clicked, only the relevant information of that button is shown
  const handleButtonClick = (section) => {
    switch (section) {
      case 'createTechnician':
        setShowTechnicianForm(true);
        setShowAddCars(false);
        setShowRemoveCars(false);
        setShowServiceRequests(false);
        setShowRemoveMiscellaneous(false);
        break;
      case 'addCars':
        setShowAddCars(true);
        setShowTechnicianForm(false);
        setShowRemoveCars(false);
        setShowServiceRequests(false);
        setShowRemoveMiscellaneous(false);
        break;
      case 'removeCars':
        setShowAddCars(false);
        setShowTechnicianForm(false);
        setShowRemoveCars(true);
        setShowServiceRequests(false);
        setShowRemoveMiscellaneous(false);
        break;
      case 'manageServiceRequests':
        setShowServiceRequests(true);
        setShowTechnicianForm(false);
        setShowAddCars(false);
        setShowRemoveCars(false);
        setShowRemoveMiscellaneous(false);
        break;
      case 'removeMiscellaneous':
        setShowServiceRequests(false);
        setShowTechnicianForm(false);
        setShowAddCars(false);
        setShowRemoveCars(false);
        setShowRemoveMiscellaneous(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* This will be the gradient box */}
      <Box
        bg='black'
        w='100%'
        color='white'
        height='100vh'
        bgGradient="linear(to-b, black, gray.600)"
      >
      {/* Will contain the greeting message for the manager and the signout button */}
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold">{`Welcome, ${userData?.first_name}`}</Text>
          </Box>
          <Flex>
            <Button variant="link" color="white" marginRight="10px" onClick={handleSignOut}>Sign Out</Button>
          </Flex>
        </Flex>
      </Box>

      {/* Form with information required to create a technician account */}
      {showTechnicianForm && (
        <form onSubmit={handleSubmitTechnicianForm} style={{ position: 'absolute', width: '50%', top: '150px', left: '500px' }}>
          <Flex flexDirection="row" justifyContent="space-between">
            <Flex flexDirection="column" justifyContent="flex-start" flex="1" marginRight="30px">
              <FormControl id="firstName" isRequired marginBottom="20px">
                <FormLabel color="white">First Name</FormLabel>
                <Input
                  type="text"
                  value={technicianFormData.firstName}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, firstName: e.target.value })}
                  color="white"
                />
              </FormControl>
              <FormControl id="lastName" isRequired marginBottom="20px">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={technicianFormData.lastName}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, lastName: e.target.value })}
                  color="white"
                />
              </FormControl>
              <FormControl id="email" isRequired marginBottom="20px">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={technicianFormData.email}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, email: e.target.value })}
                  color="white"
                />
              </FormControl>
            </Flex>
            <Flex flexDirection="column" alignItems="flex-end" flex="1" marginLeft="10px">
              <FormControl id="username" isRequired marginBottom="20px">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={technicianFormData.username}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, username: e.target.value })}
                  color="white"
                />
              </FormControl>
              <FormControl id="phone" isRequired marginBottom="20px">
                <FormLabel>Phone</FormLabel>
                <Input
                  type="number"
                  value={technicianFormData.phone}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, phone: e.target.value })}
                  color="white"
                />
              </FormControl>
              <FormControl id="password" isRequired marginBottom="20px">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={technicianFormData.password}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, password: e.target.value })}
                  color="white"
                />
              </FormControl>
            </Flex>
          </Flex>
          <Button type="submit" colorScheme="green" marginTop="10px">Create Technician</Button>
        </form>
      )}

      { /* if the account is successfully created, display a success message to the user */}
      {accountCreationSuccess && (
        <Box position="absolute" top="80%" left="46%" transform="translate(-50%, -50%)" color="white" p="4" borderRadius="md">
          Technician account created successfully!
        </Box>
      )}

      {showRemoveMiscellaneous && (
              <form onSubmit={handleSubmitMiscellaneousForm} style={{ position: 'absolute', width: '50%', top: '150px', left: '500px' }}>
                <Flex flexDirection="row" justifyContent="space-between">
              <Flex flexDirection="column" justifyContent="flex-start" flex="1" marginRight="30px">
                <FormControl id="firstName" isRequired marginBottom="20px">
                  <FormLabel color="white">Accessory Name</FormLabel>
                  <Input
                    type="text"
                    value={technicianFormData.firstName}
                    onChange={(e) => setTechnicianFormData({ ...technicianFormData, firstName: e.target.value })}
                    color="white"
                  />
                </FormControl>
                <FormControl id="lastName" isRequired marginBottom="20px">
                  <FormLabel>description</FormLabel>
                  <Input
                    type="text"
                    value={technicianFormData.lastName}
                    onChange={(e) => setTechnicianFormData({ ...technicianFormData, lastName: e.target.value })}
                    color="white"
                  />
                </FormControl>
                <FormControl id="email" isRequired marginBottom="20px">
                  <FormLabel>price</FormLabel>
                  <Input
                    type="email"
                    value={technicianFormData.email}
                    onChange={(e) => setTechnicianFormData({ ...technicianFormData, email: e.target.value })}
                    color="white"
                  />
                </FormControl>
              </Flex>
              <Flex flexDirection="column" alignItems="flex-end" flex="1" marginLeft="10px">
                <FormControl id="username" isRequired marginBottom="20px">
                  <FormLabel>image</FormLabel>
                  <Input
                    type="text"
                    value={technicianFormData.username}
                    onChange={(e) => setTechnicianFormData({ ...technicianFormData, username: e.target.value })}
                    color="white"
                  />
                </FormControl>
                <FormControl id="phone" isRequired marginBottom="20px">
                  <FormLabel>category</FormLabel>
                  <Input
                    type="number"
                    value={technicianFormData.phone}
                    onChange={(e) => setTechnicianFormData({ ...technicianFormData, phone: e.target.value })}
                    color="white"
                  />
                </FormControl>
              </Flex>
            </Flex>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <Button type="submit" colorScheme="green" marginTop="10px">Remove Car</Button>
            </form>
          )}
    
      { /* if the account is successfully created, display a success message to the user */}
      {showServiceRequests && (
        <Box position="absolute" style={{ color:'white', position: 'absolute', width: '80%', top:'10%', right: 'calc(2% + 0px)'}}>
          <h1 style={{paddingBottom:'10px'}}><strong>Service Requests</strong></h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{textAlign: 'center', width: '3%'}}>Service Request ID #</th>
                <th style={{textAlign: 'center', width: '3%'}}>Service Requested</th>
                <th style={{textAlign: 'center', width: '9%'}}>Price of Service</th>
                <th style={{textAlign: 'center', width: '9%'}}>Proposed Date and Time</th>
                <th style={{textAlign: 'center', width: '9%'}}>Car ID#</th>
                <th style={{textAlign: 'center', width: '9%'}}>Status</th>
                <th style={{textAlign: 'center', width: '9%'}}>Requested by</th>
                <th style={{textAlign: 'center', width: '9%'}}>Phone</th>
                <th style={{textAlign: 'center', width: '2%'}}></th>
                <th style={{textAlign: 'center', width: '2%'}}></th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map(request => (
                <tr key={request.service_request_id}>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 10px'}}>{request.service_request_id}</td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 10px'}}>{request.service_name}: {request.description}</td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 10px'}}>{request.service_price}</td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 10px'}}>{request.proposed_datetime}</td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 10px'}}>{request.car_id}</td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 10px'}}>{request.status}</td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 10px'}}>{request.customer_username}</td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 10px'}}>{request.customer_phone}</td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 10px'}}>
                    <Button colorScheme="green" onClick={() => handleAccept(request.service_request_id)}>
                      Accept
                    </Button>
                  </td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 0px'}}>
                    <Button colorScheme="red" onClick={() => handleDecline(request.service_request_id)}>
                      Decline
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      )}

    {showRemoveCars && (
            <form onSubmit={handleSubmitRemoveCarForm} style={{ position: 'absolute', width: '50%', top: '150px', left: '500px' }}>
              <Flex flexDirection="row" justifyContent="space-between">
                <Flex flexDirection="column" justifyContent="flex-start" flex="1" marginRight="30px">
                  <FormControl id="car_id" isRequired marginBottom="20px">
                    <FormLabel color="white">Car VIN</FormLabel>
                    <Input
                      type="text"
                      value={removeCarFormData.car_id}
                      onChange={(e) => setRemoveCarFormData({ ...removeCarFormData, car_id: e.target.value })}
                      placeholder='Enter VIN to remove car'
                      color="white"
                    />
                  </FormControl>
                </Flex>
              </Flex>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <Button type="submit" colorScheme="green" marginTop="10px">Remove Car</Button>
            </form>
          )}

      {/* Dashboard options shown to the manager upon signing in */}
      <Box
        bg="rgba(128, 128, 128, 0.15)"
        color="white"
        w="300px"
        h="600px"
        position="fixed"
        left="0"
        top="0"
        marginTop="90px"
        borderRadius="xl"
      >
        {/* options for the manager to choose from */}
        <Flex flexDirection="column" alignItems="flex-start" p={4}>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px" onClick={() => handleButtonClick('createTechnician')}>Create Technician Account</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px" onClick={() => handleButtonClick('manageServiceRequests')}>Service Appointment Requests</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Assign Technicians</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px" onClick={() => handleButtonClick('addCars')}>Add Cars to Dealership</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px" onClick={() => handleButtonClick('removeCars')}>Remove Cars From Dealership</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Manage Test Drive Appointments</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Generate Report</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Send Service Reports</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Manage Offers</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Add Miscellaneous Car Products</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px" onClick={() => handleButtonClick('removeMiscellaneous')}>Remove Miscellaneous Car Products</Button>
        </Flex>
      </Box>
      {showAddCars && <HandleAddCars managerId={userData.manager_id} />}
    </>
  );
};

// component for displaying the admin dashboard with admin options
const Admin = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate();
  /*Create Technician Form Hooks and Variables*/
  const [showTechnicianForm, setShowTechnicianForm] = useState(false);
  const [accountCreationSuccess, setAccountCreationSuccess] = useState(false);
  const [technicianFormData, setTechnicianFormData] = useState({
    firstName: '',  
    lastName: '',  
    email: '',
    username: '',
    phone: '',
    password: '',
    admin_id: userData.admin_id
  });
  /*End Of: Create Technician Form Hooks and Variables*/

  /*Create Manager Form Hooks and Variables*/
  const [showManagerForm, setShowManagerForm] = useState(false);
  const [managerFormData, setManagerFormData] = useState({
    firstName: '',  
    lastName: '',  
    email: '',
    username: '',
    phone: '',
    password: '',
    admin_id: userData.admin_id
  });

  // handler to toggle technician form visibility
  const handleSubmitTechnicianForm = (event) => {
    event.preventDefault();
    const formData = {
      ...technicianFormData,
      admin_id: userData.admin_id
    };
  
    axios.post('/add_technician', formData)
      .then(response => {
        console.log('Technician added successfully');
        setTechnicianFormData({  // Reset all form fields to blank
          firstName: '',  
          lastName: '',  
          email: '',
          username: '',
          phone: '',
          password: ''
        });
        setAccountCreationSuccess(true); // Set account creation success state to True

        setTimeout(() => {
          setAccountCreationSuccess(false); // Hide the success message after 3 seconds
        }, 3000);
      })
      .catch(error => {
        console.error('Error adding technician:', error);
      });
  };


  const handleManagerFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      ...managerFormData,
      admin_id: userData.admin_id
    };

    axios.post('/add_manager', formData)
      .then(response => {
        console.log('Manager added successfully');
        setManagerFormData({  // Reset all form fields to blank
          firstName: '',  
          lastName: '',  
          email: '',
          username: '',
          phone: '',
          password: ''
        });
        setAccountCreationSuccess(true); // Set account creation success state to True

        setTimeout(() => {
          setAccountCreationSuccess(false); // Hide the success message after 3 seconds
        }, 3000);
      })
      .catch(error => {
        console.error('Error adding manager:', error);
      });

    console.log('Form data: ', managerFormData);
  };

  // when admin clicks on sign out, gets redirected to the homepage
  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/', { replace: true });
  };

  const handleCreateTechnician = () => {
    setShowTechnicianForm(true);
  };

  // ensures that when a button is clicked, only the relevant information of that button is shown
  const handleButtonClick = (section) => {
    switch (section) {
      case 'createTechnician':
        setShowTechnicianForm(true);
        break;
    }
  };

  return (
    <>
      {/* this will be the gradient box */}
      <Box
        bg='black'
        w='100%'
        color='white'
        height='100vh'
        bgGradient="linear(to-b, black, gray.600)"
      >
        {/* will contain the greeting message for admin and the signout button */}
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold">{`Welcome, ${userData?.first_name}`}</Text>
          </Box>
          <Flex>
            <Button variant="link" color="white" marginRight="10px" onClick={handleSignOut}>Sign Out</Button>
          </Flex>
        </Flex>
      </Box>

      {/* Form with information required to create a technician account */}
      {showTechnicianForm && (
        <form onSubmit={handleSubmitTechnicianForm} style={{ position: 'absolute', width: '50%', top: '150px', left: '500px' }}>
          <Flex flexDirection="row" justifyContent="space-between">
            <Flex flexDirection="column" justifyContent="flex-start" flex="1" marginRight="30px">
              <FormControl id="firstName" isRequired marginBottom="20px">
                <FormLabel color="white">First Name</FormLabel>
                <Input
                  type="text"
                  value={technicianFormData.firstName}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, firstName: e.target.value })}
                  color="white"
                />
              </FormControl>
              <FormControl id="lastName" isRequired marginBottom="20px">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={technicianFormData.lastName}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, lastName: e.target.value })}
                  color="white"
                />
              </FormControl>
              <FormControl id="email" isRequired marginBottom="20px">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={technicianFormData.email}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, email: e.target.value })}
                  color="white"
                />
              </FormControl>
            </Flex>
            <Flex flexDirection="column" alignItems="flex-end" flex="1" marginLeft="10px">
              <FormControl id="username" isRequired marginBottom="20px">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={technicianFormData.username}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, username: e.target.value })}
                  color="white"
                />
              </FormControl>
              <FormControl id="phone" isRequired marginBottom="20px">
                <FormLabel>Phone</FormLabel>
                <Input
                  type="number"
                  value={technicianFormData.phone}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, phone: e.target.value })}
                  color="white"
                />
              </FormControl>
              <FormControl id="password" isRequired marginBottom="20px">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={technicianFormData.password}
                  onChange={(e) => setTechnicianFormData({ ...technicianFormData, password: e.target.value })}
                  color="white"
                />
              </FormControl>
            </Flex>
          </Flex>
          <Button type="submit" colorScheme="green" marginTop="10px">Create Technician</Button>
        </form>
      )}

      {/* Conditional Rendering of the Create Manager Account Form */}
      {showManagerForm && (
            <form onSubmit={handleManagerFormSubmit} style={{ position: 'absolute', width: '50%', top: '150px', left: '500px' }}>
            <Flex flexDirection="row" justifyContent="space-between">
              <Flex flexDirection="column" justifyContent="flex-start" flex="1" marginRight="30px">
                <FormControl id="firstName" isRequired marginBottom="20px">
                  <FormLabel color="white">First Name</FormLabel>
                  <Input
                    type="text"
                    value={managerFormData.firstName}
                    onChange={(e) => setManagerFormData({ ...managerFormData, firstName: e.target.value })}
                    color="white"
                  />
                </FormControl>
                <FormControl id="lastName" isRequired marginBottom="20px">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={managerFormData.lastName}
                    onChange={(e) => setManagerFormData({ ...managerFormData, lastName: e.target.value })}
                    color="white"
                  />
                </FormControl>
                <FormControl id="email" isRequired marginBottom="20px">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={managerFormData.email}
                    onChange={(e) => setManagerFormData({ ...managerFormData, email: e.target.value })}
                    color="white"
                  />
                </FormControl>
              </Flex>
              <Flex flexDirection="column" alignItems="flex-end" flex="1" marginLeft="10px">
                <FormControl id="username" isRequired marginBottom="20px">
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={managerFormData.username}
                    onChange={(e) => setManagerFormData({ ...managerFormData, username: e.target.value })}
                    color="white"
                  />
                </FormControl>
                <FormControl id="phone" isRequired marginBottom="20px">
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="number"
                    value={managerFormData.phone}
                    onChange={(e) => setManagerFormData({ ...managerFormData, phone: e.target.value })}
                    color="white"
                  />
                </FormControl>
                <FormControl id="password" isRequired marginBottom="20px">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={managerFormData.password}
                    onChange={(e) => setManagerFormData({ ...managerFormData, password: e.target.value })}
                    color="white"
                  />
                </FormControl>
              </Flex>
            </Flex>
            <Button type="submit" colorScheme="green" marginTop="10px">Create Manager</Button>
          </form>
      )}

      { /* if the account is successfully created, display a success message to the user */}
      {accountCreationSuccess && (
        <Box position="absolute" top="80%" left="46%" transform="translate(-50%, -50%)" color="white" p="4" borderRadius="md">
          Technician account created successfully!
        </Box>
      )}

      {/* dashboard options shown to admin upon signing in */}
      <Box
        bg="rgba(128, 128, 128, 0.15)"
        color="white"
        w="300px"
        h="600px"
        position="fixed"
        left="0"
        top="0"
        marginTop="90px"
        borderRadius="xl"
      >
        { /* options for the admin to choose from */}
        <Flex flexDirection="column" alignItems="flex-start" p={4}>
          <Button variant="green" color="white" marginBottom="10px" onClick={() => setShowManagerForm(true)}>Create Manager Account</Button>
          <Button variant="green" color="white" marginBottom="10px" onClick={() => handleButtonClick('createTechnician')}>Create Technician Account</Button>
          <Button variant="green" color="white" marginBottom="10px">Service Appointment Requests</Button>
          <Button variant="green" color="white" marginBottom="10px">Assign Technicians</Button>
          <Button variant="green" color="white" marginBottom="10px">Add Cars To Dealership</Button>
          <Button variant="green" color="white" marginBottom="10px">Remove Cars From Dealership</Button>
          <Button variant="green" color="white" marginBottom="10px">Manage Test Drive Appointments</Button>
          <Button variant="green" color="white" marginBottom="10px">Generate Report</Button>
          <Button variant="green" color="white" marginBottom="10px">Send Service Report</Button>
        </Flex>
      </Box>
    </>
  );
}

// component to display technician dashboard with options to choose from
const Technician = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate();
  const [showAssignedServices, setShowAssignedServices] = useState(false);
  const [assignedServices, setAssignedServices] = useState([]);
  
  useEffect(() => {
    if (showAssignedServices) {
      fetchAssignedServices();
    }
  }, [showAssignedServices]);

  const handleAccept = (serviceRequestId) => {
    const updatedRequest = {
      status: 'accepted'
    };
  
    axios.patch(`/update_customer_service_requests/${serviceRequestId}`, updatedRequest)
      .then(response => {
        // Update UI if necessary
        console.log('Service request accepted:', response.data);
        fetchAssignedServices();
      })
      .catch(error => {
        console.error('Error accepting service request:', error);
      });
  };
  
  const handleDecline = (serviceRequestId) => {
    const updatedRequest = {
      status: 'declined'
    };
  
    axios.patch(`/update_customer_service_requests/${serviceRequestId}`, updatedRequest)
      .then(response => {
        // Update UI if necessary
        console.log('Service request declined:', response.data);
        fetchAssignedServices();
      })
      .catch(error => {
        console.error('Error declining service request:', error);
      });
  };

  const fetchAssignedServices = () => {
    axios.get('/show_assigned_services')
      .then(response => {
        console.log(response.data); // Add this line
        setAssignedServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching assigned services:', error);
      });
  };

  // when technician clicks on sign out, gets redirected to the homepage
  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/', { replace: true });
  };

  const handleButtonClick = (section) => {
    switch (section) {
      case 'checkAssignedWork':
        setShowAssignedServices(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box bg='black' w='100%' color='white' height='100vh' bgGradient="linear(to-b, black, gray.600)">
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold">{`Welcome, ${userData?.first_name}`}</Text>
          </Box>
          <Flex>
            <Button variant="link" color="white" marginRight="10px" onClick={handleSignOut}>Sign Out</Button>
          </Flex>
        </Flex>
      </Box>

      <Box bg="rgba(128, 128, 128, 0.15)" color="white" w="300px" h="600px" position="fixed" left="0" top="0" marginTop="90px" borderRadius="xl">
        <Flex flexDirection="column" alignItems="flex-start" p={4}>
          <Button variant="green" color="white" marginBottom="10px" onClick={() => handleButtonClick('checkAssignedWork')}>Assigned Work</Button>
          <Button variant="green" color="white" marginBottom="10px">Send Service Report</Button>
        </Flex>
      </Box>

      {showAssignedServices && (
        <Box position="absolute" style={{ color:'white', position: 'absolute', width: '80%', top:'10%', right: 'calc(2% + 0px)'}}>
          <h1 style={{paddingBottom:'10px'}}><strong>Assigned Work</strong></h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{textAlign: 'center'}}>Assigned Service ID</th>
                <th style={{textAlign: 'center'}}>Service</th>
                <th style={{textAlign: 'center'}}>Assigned Technician</th>
                <th style={{textAlign: 'center'}}>Status</th>
                <th style={{textAlign: 'center'}}>Customer Information</th>
              </tr>
            </thead>
            <tbody>
              {assignedServices.map(service => (
                <tr key={service.assigned_service_id}>
                  <td style={{textAlign: 'center'}}>{service.assigned_service_id}</td>
                  <td style={{textAlign: 'center'}}>{service.service_name}: {service.service_description}</td>
                  <td style={{textAlign: 'center'}}>{`${service.technician_first_name} ${service.technician_last_name} (${service.technician_email})`}</td>
                  <td style={{textAlign: 'center'}}>{service.status}</td>
                  <td style={{textAlign: 'center'}}>{`${service.customer_first_name} ${service.customer_last_name} (${service.customer_phone})`}</td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 10px'}}>
                    <Button colorScheme="green" onClick={() => handleAccept(service.service_request_id)}>
                      Accept
                    </Button>
                  </td>
                  <td style={{textAlign: 'center', padding:'0px 0px 20px 0px'}}>
                    <Button colorScheme="red" onClick={() => handleDecline(service.service_request_id)}>
                      Decline
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      )}
    </>
  );
}

export default App;