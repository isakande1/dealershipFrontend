// import necessary libraries
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';
import {
  Center, Text, Heading, Box, HStack, Flex, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
  AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Select, Stack, Image, Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaTimes, FaCheck, FaChevronDown, FaPhone, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import './App.css';
import { useLocation } from 'react-router-dom';
import CarDetails from './carDetails';
import Addons from './Addons'
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
          <Route path="/carDetails" element={<CarDetails />} />
          <Route path="/Service" element={<CustomerSerivceAppointment />} />
          <Route path="/ServiceHistory" element={<ServiceHistory />} />
          <Route path="/carAccessories" element={<CarAccessories />} />
          <Route path="/Addons" element={<Addons/>} />
          <Route path="ContactPage" element={<ContactPage/>} />
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
        <MenuButton as={Box} bg="lightgray" color="black" fontSize="lg" p={2} width="180px" height="30px">
          <Flex alignItems="center" marginTop="-3px">
            <Box marginRight={2}>
              <Icon as={FaChevronDown} />
            </Box>
            {selected && (
              <Text position="absolute" marginLeft="22px" marginTop="-8px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{selected}</Text>
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
    >
      <img
        src={car.image}
        alt="Car"
        style={{
          display: "block",
          margin: "auto",
          width: '240px',
          height: '275px',
          marginTop: '100px',
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
      <Button bg="lightgray" marginLeft="10px" marginTop="42px" textAlign="center" width="80px" height="30px" color="black" borderRadius="lg" onClick={() => handleSearch({ make, model, color, budget })}>
        <Text align="center">Search</Text>
      </Button>
      <Button bg="lightgray" marginLeft="10px" marginTop="42px" textAlign="center" width="80px" height="30px" color="black" borderRadius="lg" onClick={handleClear}>Clear</Button>
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

  useEffect(() => {
    fetchCars();
  }, [currentPage, searchParams]);

  // grab the relvant car information from the backend to display all the cars to the user
  const fetchCars = async () => {
    try {
      const response = await fetch(`/get_cars_to_display?page=${currentPage}&per_page=12`);
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      if (filteredCars.length > 0) {
        setTotalPages(Math.ceil(filteredCars.length / 6));
      } else {
        setTotalPages(data.total_pages);
      }
      setAllCars(data.cars);
    } catch (error) {
      console.error('Error fetching cars:', error.message);
    }
  };

  // component to handle clicking on a page number and seeing relevant cars on that page
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // component to handle searching for cars based on filters and applying appropriate cars to be displayed per page
  const handleSearch = ({ make, model, color, budget }) => {
    axios.post('/cars_details', { make, model, color, budget })
      .then(response => {
        console.log('Filtered cars:', response.data);
        setFilteredCars(response.data);
        setSearchParams({ make, model, color, budget });
        setCurrentPage(1); // Reset currentPage when filters are applied
      })
      .catch(error => {
        console.error('Error fetching filtered cars:', error);
      });
  };

  // once user clicks clear, their filter selection will be cleared and they will automatically see all the cars
  const handleClear = () => {
    setFilteredCars([]);
    setSearchParams({});
    setCurrentPage(1);
    fetchCars();
  };

  const handleClickCart = () => {
  const confirmed = window.confirm('You need to be logged in. Proceed to login?');
  if (confirmed) {
  // Redirect to login page
  window.location.href = '/login';
}
  };

  // produces the format of 2 rows and 3 columns per page to be displayed
  const rows = [];
  const carsToDisplay = filteredCars.length > 0 ? filteredCars : allCars;
  for (let i = 0; i < carsToDisplay.length; i += 4) {
    const row = carsToDisplay.slice(i, i + 4);
    rows.push(row);
  }

  return (
    <>
      <Box bg='black' w='100%' h='100vh' position='fixed' zIndex='-1' />
      <Box
        bg='black'
        w='100%'
        color='white'
        height="400px"
        bgGradient="linear(to-b, black, gray.600)"
        borderBottomLeftRadius="xl"
        borderBottomRightRadius="xl"
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
        <center><Text fontSize="3xl" fontWeight="bold">Home Page</Text></center>
        <Box p={4} marginTop="10px" marginLeft="85px">
          <Text fontSize="3xl" fontWeight="bold">Your one stop</Text>
          <Text fontSize="3xl" fontWeight="bold">for New Cars,</Text>
          <Text fontSize="3xl" fontWeight="bold">Service,</Text>
          <Text fontSize="3xl" fontWeight="bold">& Accessories</Text>
        </Box>
      </Box>

      {/* handles both clicking the search button and filtering cars as well as clearing the filters selected */}
      <Flex justifyContent="center" alignItems="center" position="relative" marginTop="-10px">
        <Box width="1000px" height="100px" bg="purple.800" position="absolute" borderRadius="xl">
          <FilterCarsSearch handleSearch={handleSearch} handleClear={handleClear} />
        </Box>
      </Flex>

      {/* displays the car boxes in the proper format */}
      <Flex flexDirection="column" alignItems="center" marginTop="20px" marginBottom="20px">
        {rows.slice(0, 3).map((row, rowIndex) => (
          <Flex key={rowIndex} justifyContent="flex-start">
            {row.map((car, index) => (
              <Box key={index} marginRight={index === row.length - 1 ? 0 : "10px"} marginBottom={rowIndex === 1 && row.length < 4 && index === row.length - 1 ? 0 : "10px"}>
                <CarDisplayBox car={car} />
              </Box>
            ))}
          </Flex>
        ))}
      </Flex>

      {/* buttons for pagination */}
      <Box height="40px">
        <Flex justifyContent="center" alignItems="center">
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <Button key={pageNumber + 1} color="white" onClick={() => handlePageClick(pageNumber + 1)} variant="outline" ml={2} width="40px">
              {pageNumber + 1}
            </Button>
          ))}
        </Flex>
      </Box>
      <Footer marginTop="40px"/>
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
  

  useEffect(() => {
    fetchCars();
  }, [currentPage, searchParams]);

  // grab the relvant car information from the backend to display all the cars to the user
  const fetchCars = async () => {
    try {
      const response = await fetch(`/get_cars_to_display?page=${currentPage}&per_page=12`);
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      if (filteredCars.length > 0) {
        setTotalPages(Math.ceil(filteredCars.length / 6));
      } else {
        setTotalPages(data.total_pages);
      }
      setAllCars(data.cars);
    } catch (error) {
      console.error('Error fetching cars:', error.message);
    }
  };

  // component to handle clicking on a page number and seeing relevant cars on that page
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // component to handle searching for cars based on filters and applying appropriate cars to be displayed per page
  const handleSearch = ({ make, model, color, budget }) => {
    axios.post('/cars_details', { make, model, color, budget })
      .then(response => {
        console.log('Filtered cars:', response.data);
        setFilteredCars(response.data);
        setSearchParams({ make, model, color, budget });
        setCurrentPage(1); // Reset currentPage when filters are applied
      })
      .catch(error => {
        console.error('Error fetching filtered cars:', error);
      });
  };

  // once user clicks clear, their filter selection will be cleared and they will automatically see all the cars
  const handleClear = () => {
    setFilteredCars([]); 
    setSearchParams({}); 
    setCurrentPage(1);
    fetchCars(); 
  };

  // produces the format of 2 rows and 3 columns per page to be displayed
  const rows = [];
  const carsToDisplay = filteredCars.length > 0 ? filteredCars : allCars;
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

        {/* the text that appears inside the gradient box */}
        <Box p={4} marginTop="20px" marginLeft="85px">
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
            <Button variant="ghost" color="white" marginBottom="10px">View Test Drive Appointment</Button>
            <Button variant="ghost" color="white" marginBottom="10px">Manage Offers</Button>
          </Flex>
        </Box>
      )}

      {/* handles both clicking the search button and filtering cars as well as clearing the filters selected */}
      <Flex justifyContent="center" alignItems="center" position="relative" marginTop="-10px">
        <Box width="1000px" height="100px" bg="purple.800" position="absolute" borderRadius="xl">
          <FilterCarsSearch handleSearch={handleSearch} handleClear={handleClear} />
        </Box>
      </Flex>

      {/* displays the car boxes in the proper format */}
      <Flex flexDirection="column" alignItems="center" marginTop="20px" marginBottom="20px"> 
        {rows.slice(0, 3).map((row, rowIndex) => (
          <Flex key={rowIndex} justifyContent="flex-start">
            {row.map((car, index) => (
              <Box key={index} marginRight={index === row.length - 1 ? 0 : "10px"} marginBottom={rowIndex === 1 && row.length < 4 && index === row.length - 1 ? 0 : "10px"}>
                <CarDisplayBox car={car} />
              </Box>
            ))}
          </Flex>
        ))}
      </Flex>

      {/* buttons for pagination */}
      <Box height="40px">
        <Flex justifyContent="center" alignItems="center">
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <Button key={pageNumber + 1} color="white" onClick={() => handlePageClick(pageNumber + 1)} variant="outline" ml={2} width="40px">
              {pageNumber + 1}
            </Button>
          ))}
        </Flex>
      </Box>
      <Footer marginTop="40px"/>
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
    e.preventDefault(); // Prevent the default form submission
    // Assuming you have an endpoint like '/api/addCar'
    fetch(`http://localhost:5000/add_car/${userData.customer_id}`, {
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

  return (
    <>
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

  // Assume you have a function to fetch service history data from the backend
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

  return (
    <>
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
          {/* You can add additional components or actions here */}
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
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleRemoveItem = async (cartId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete_cart_item/${cartId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      
      setCartItems(prevCartItems => prevCartItems.filter(item => item.cart_id !== cartId));
      
      calculateTotalPrice(cartItems.filter(item => item.cart_id !== cartId));
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

  return (
    <Box bg='black' w='100%' color='white' minHeight='100vh' bgGradient="linear(to-b, black, gray.600)">
      <Flex justifyContent="space-between" alignItems="center" p={4}>
        <Text fontSize="3xl" fontWeight="bold" color="white">Cart</Text>
        <Text color="white">{`Customer ID: ${userData.customer_id}`}</Text>
        <Text color="white">{`Name: ${userData.first_name}`}</Text>
      </Flex>

      <Box pt={20} pb={20} overflowY="auto">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <Flex key={item.cart_id} alignItems="center" justify="space-between" mb={4}>
                <Box onClick={() => handleImageClick(item.item_image)}>
                  <Image src={item.item_image} alt={item.item_name} boxSize="50px" cursor="pointer" />
                </Box>
                <Box ml={4}>
                  <Text color="white">{item.item_name}</Text>
                  <Text color="white">${item.item_price}</Text>
                </Box>
                <Button colorScheme="red" onClick={() => handleRemoveItem(item.cart_id)}>Remove</Button>
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

  return (
    <>
      <Box
        bg='black'
        w='100%'
        color='white'
        height='100vh'
        bgGradient="linear(to-b, black, gray.600)"
      >
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold">Schedule Service Appointment</Text>
          </Box>
        </Flex>

        <Box mt={8} mx="auto" maxW="400px">
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px' }}>
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

  return (
    <>
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

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleButtonClick = () => {
    fetchAccessories(selectedCategory);
  };

  return (
    <>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" my={4}>
        Accessories
      </Text>
      <FormControl mx="auto" my={4} w="max-content">
        <FormLabel>Category</FormLabel>
        <Select
          name="category"
          defaultValue=""
          onChange={handleSelectChange}
          colorScheme="red"
        >
          <option value="">Select a category...</option>
          <option value="car-mat">Car Mat</option>
          <option value="cover">Cover</option>
          <option value="wiper">Wiper</option>
          <option value="air-freshener">Air Freshener</option>
          <option value="dash-cam">Dash Cam</option>
        </Select>
      </FormControl>
      <Button onClick={handleButtonClick} colorScheme="blue" mx="auto" mt={4} mb={8}>
        Fetch Accessories
      </Button>
      <Table variant="striped" colorScheme="blue" mx="auto" w="max-content">
        <Thead>
          <Tr>
            <Th>Accessory ID</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Image</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accessories.map((accessory, index) => (
            <Tr key={index}>
              <Td>{accessory.accessoire_id}</Td>
              <Td>{accessory.name}</Td>
              <Td>{accessory.description}</Td>
              <Td>{accessory.price}</Td>
              <Td>{accessory.image}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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

  return (
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
      <Flex direction="column" background="white" p={6} rounded="md" width="90%" maxWidth="500px" color="black">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold" color="black">Modify Personal Information</Text>
          <Button variant="link" colorScheme="blue" onClick={handleSignOut}>Sign Out</Button>
        </Flex>
        <Text mb={4}>Client ID: {userData?.customer_id}</Text>
        <form>
          <FormControl mb={3}>
            <FormLabel htmlFor='first_name' color='black'>First Name</FormLabel>
            <Input
              id='first_name'
              type='text'
              name='first_name'
              value={editedData.first_name}
              onChange={handleInputChange}
              disabled
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor='last_name' color='black'>Last Name</FormLabel>
            <Input
              id='last_name'
              type='text'
              name='last_name'
              value={editedData.last_name}
              onChange={handleInputChange}
              disabled
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor='usernames' color='black'>User Name</FormLabel>
            <Input
              id='usernames'
              type='text'
              name='usernames'
              value={editedData.usernames}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor='email' color='black'>Email</FormLabel>
            <Input
              id='email'
              type='email'
              name='email'
              value={editedData.email}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor='phone' color='black'>Phone</FormLabel>
            <Input
              id='phone'
              type='tel'
              name='phone'
              value={editedData.phone}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor='Address' color='black'>Address</FormLabel>
            <Input
              id='Address'
              type='text'
              name='Address'
              value={editedData.Address}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor='password' color='black'>Password</FormLabel>
            <Input
              id='password'
              type='password'
              name='password'
              value={editedData.password}
              onChange={handleInputChange}
            />
          </FormControl>

          {EditMessage && <Text color="red.500" mb={3}>{EditMessage}</Text>}
          <Button colorScheme='blue' onClick={handleEdit}>
            Edit
          </Button>


        </form>
      </Flex>
    </Box>
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
//Go back to the previous page if exist
        // if(window.history.length > 1){
        //  navigate(-1);
        // }
//End 
       const previousUrl = location.state?.previousUrl;
       const car_id = location.state?.car_id;
        previousUrl ? navigate(previousUrl, {state :{ car_id : car_id, userData: data}}) : navigate('/homepage', { state: { userData: data } });
        
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
  const [serviceRequests, setServiceRequests] = useState([]);
  useEffect(() => {
    if (showServiceRequests) {
      axios.get('/show_customer_service_requests/')
        .then(response => {
          setServiceRequests(response.data);
        })
        .catch(error => {
          console.error('Error fetching service requests:', error);
        });
    }
  }, [showServiceRequests]);


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
        setShowServiceRequests(false);
        break;
      case 'addCars':
        setShowAddCars(true);
        setShowTechnicianForm(false);
        setShowServiceRequests(false);
        break;
      case 'manageServiceRequests':
        setShowServiceRequests(true);
        setShowTechnicianForm(false);
        setShowAddCars(false);

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

      { /* if the account is successfully created, display a success message to the user */}
      {showServiceRequests && (
        <Box position="absolute" style={{ color:'white', position: 'absolute', width: '50%', top: '150px', left: '500px'}}>
          <h2>Service Requests</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Service Request ID #</th>
                <th>Service Requested</th>
                <th>Price of Service</th>
                <th>Proposed Date and Time</th>
                <th>Car ID#</th>
                <th>Status</th>
                <th>Requested by</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map(request => (
                <tr key={request.service_request_id}>
                  <td>{request.service_request_id}</td>
                  <td>{request.service_name}: {request.description}</td>
                  <td>{request.service_price}</td>
                  <td>{request.proposed_datetime}</td>
                  <td>{request.car_id}</td>
                  <td>{request.status}</td>
                  <td>{request.customer_username}</td>
                  <td>{request.customer_phone}</td>
                  <td>
                    <Button colorScheme="red">
                      Decline
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
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
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Remove Cars From Dealership</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Manage Test Drive Appointments</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Generate Report</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Send Service Reports</Button>
          <Button variant="liquid" colorScheme="green" color="white" marginBottom="10px">Manage Offers</Button>
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


  const handleChange = (e) => {
    setManagerFormData({ ...managerFormData, [e.target.name]: e.target.value });
  };
  const handleManagerFormSubmit = (managerFormData) => {
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
            <Box
              bg="rgba(128, 128, 128, 0.15)"
              color="white"
              w="400px"
              h="600px"
              position="relative"
              marginTop="90px"
              borderRadius="xl"
              p={4}
            >
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Create Manager Account
              </Text>
              {/* Render your form fields here */}
              <Box as="form" onSubmit={handleManagerFormSubmit}>
                <FormControl mb={4}>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={managerFormData.firstName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={managerFormData.lastName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={managerFormData.email}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    type="username"
                    id="username"
                    name="username"
                    value={managerFormData.username}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <Input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={managerFormData.phone}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={managerFormData.password}
                    onChange={handleChange}
                  />
                </FormControl>

                <Button type="submit" colorScheme="green">
                  Create Manager
                </Button>
              </Box>
            </Box>
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

  // when technician clicks on sign out, gets redirected to the homepage
  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/', { replace: true });
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
        {/* will contain the greeting message for technician and the signout button */}
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold">{`Welcome, ${userData?.first_name}`}</Text>
          </Box>
          <Flex>
            <Button variant="link" color="white" marginRight="10px" onClick={handleSignOut}>Sign Out</Button>
          </Flex>
        </Flex>
      </Box>

      {/* dashboard options shown to technician upon signing in */}
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
        { /* options for technician to choose from */}
        <Flex flexDirection="column" alignItems="flex-start" p={4}>
          <Button variant="green" color="white" marginBottom="10px">Check Assigned Work</Button>
          <Button variant="green" color="white" marginBottom="10px">Modify Service Status</Button>
          <Button variant="green" color="white" marginBottom="10px">Send Service Report</Button>
        </Flex>
      </Box>
    </>
  );
}

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-color">
      <Container color='red'>
        <img src={logo} href='/homepage' alt="" width="4%" height="4%" className="d-inline-block align-top me-2"/>
        <Navbar.Brand href="/homepage">Velocity Motors</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/homepage">Home</Nav.Link>
            {/* <Nav.Link href="/Cart">Cart</Nav.Link>
            <NavDropdown title="Dashboard" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default App;