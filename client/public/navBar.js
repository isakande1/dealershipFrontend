import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Center, Text, Heading, Box, HStack, Flex, Grid, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
  AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Image
} from "@chakra-ui/react";


export default function NavBar({isSignedIn}){
const location = useLocation();
const navigate = useNavigate();
 const userData=  JSON.parse(sessionStorage?.getItem('data'))

 console.log("parser",userData);

const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
  };
console.log("loggegin",isSignedIn);
return(
 <>
{ (isSignedIn && location.pathname != '/homepage' && location.pathname != '/' && location.pathname != '/login')  &&(<>
  <Box zIndex="2" position="fixed"  left="0" top="0" w="100%">
    <nav className="navbar" >
      <ul className="nav-list">
        <li className="nav-item">
          <button  style= {{color:'red'}} className="nav-button" onClick={() => handleNavigate('/homepage')}>
            Home
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/Cart')}>
            Cart
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
            Profile
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/PastPurchase')}>
            Past Purchase
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/OwnCar')}>
            Personal cars
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => handleNavigate('/TestDriveHistory')}>
            Test Drive status
          </button>
        </li>
        <button className="nav-button" onClick={() => handleNavigate('/contract')}>
            Finance contracts 
        </button>

        <button className="nav-button" onClick={() => handleNavigate('/customerManageOffers')}>
            Manage offer
        </button>
      </ul>
      </nav>
      </Box>
      <Box h="50px" w="100%"> </Box> </>
    )}
      </>
);
}