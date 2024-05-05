import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, border } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Center, Text, Heading, Box, HStack, Flex, Grid, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
    AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Image
} from "@chakra-ui/react";
import { FaTimes, FaCheck, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import './App.css';



export default function TestDriveForm() {
  const location = useLocation();
  const { userData, carInfos } = location.state;
  const [error, setError] = useState('');

  const [EditMessage, setEditMessage] = useState('');
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedDate = `${date} ${time}:00`;
    const formData = {
      customer_id: userData.customer_id,  
      car_id: carInfos.car_id, 
      status: 'pending',
      appointment_date: formattedDate,
    };

    try {
      const response = await axios.post('http://localhost:5000/testdrive', formData);
      console.log(response.data); 

      if (response.status === 201) {
        console.log('Test drive scheduled successfully!');
        setEditMessage('Appointment went through');
        setTimeout(() => {
          setEditMessage(null);
        }, 4000);
        resetForm();
      } else {
        setError('Failed to schedule test drive.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to schedule test drive.');
    }
  };
  const resetForm = () => {
    setTime('');
    setDate('');
  };

  const navigate = useNavigate();  

const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
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
            <Text fontSize="3xl" fontWeight="bold">Schedule Test Drive</Text>
          </Box>
        </Flex>

        <Box mt={8} mx="auto" maxW="400px" id='testDriveForm'>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px' }}>
            <form onSubmit={handleSubmit}>
            <Text fontSize="s" mb={2} style={{ color: 'black' }}> This is a Form for the : {carInfos.year} {carInfos.make} {carInfos.model} </Text>
            <Text fontSize="s" mb={6} style={{ color: 'black' }}> VIN-Number: {carInfos.car_id}</Text>
              <label htmlFor="datePicker" style={{ color: 'black' }}>Select Date:</label>
              <Input
                type="date"
                id="datePicker"
                placeholder="Select Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                mb={4}
                style={{ color: 'black' }}
              />
              <label htmlFor="time" style={{ color: 'black' }}>Select Time:</label>
              <Input
                type="time"
                id="time"
                placeholder="Select Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                mb={4}
                style={{ color: 'black' }}
              />
              <Button type="submit" colorScheme="blue">Schedule</Button>
              {EditMessage && <p style={{ color: 'black' }}>{EditMessage}</p>}
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
}
