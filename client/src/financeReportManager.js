import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, border } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Center, Text, Heading, Box, HStack, Flex, Grid, Button, Input, Td, Tr, Tbody, Table, Th, Thead, FormControl, Alert, FormLabel,
    AlertIcon, VStack, Menu, MenuItem, MenuList, MenuButton, Icon, Image
} from "@chakra-ui/react";
import { FaTimes, FaCheck, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';


export default function FinanceReport () {
   const [fetchedReport, setFetchedReport] = useState([]);
  
   useEffect(() => {
      const financereport = async () => {
        try {
          const response = await fetch('/fetchFinance',{method : 'POST'});
          if (response.ok) {
            const data = await response.json();
            setFetchedReport(data.finances);
          } else {
            throw new Error('Failed to fetch finances reports');
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      financereport();
    },[] );
  
  
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
              <Text fontSize="3xl" fontWeight="bold">Finance reports</Text>
            </Box>
          </Flex>
  
          {fetchedReport.length === 0 ? (
            <Box p={4}>
              <Text>No Finance reports right now.</Text>
            </Box>
          ) : (
            <Box overflowX={"auto"}>
            <Table variant="striped"  colorScheme="black">
              <Thead>
                <Tr>
                  <Th>Report_id</Th>
                  <Th>Customer_id</Th>
                  <Th>First_name</Th>
                  <Th>Last_name</Th>
                  <Th>Car_make</Th>
                  <Th>car_model</Th>
                  <Th>car_year</Th>
                  <Th>Car_price</Th>
                  <Th>Credit_score</Th>
                  <Th>Finance_decision</Th>
                  <Th>Loan_term</Th>
                  <Th>Loan_apr</Th>
                  <Th>Monthly_payment</Th>
                
                </Tr>
              </Thead>
              <Tbody>
                {fetchedReport.map(item => (
                  <Tr key={item.finance_id}>
                    <Td>{item.finance_id}</Td>
                    <Td>{item.customer_id}</Td>
                    <Td>{item.first_name}</Td>
                    <Td>{item.last_name}</Td>
                    <Td>{item.car_make}</Td>
                    <Td>{item.car_model}</Td>
                    <Td>{item.car_year}</Td>
                    <Td>${item.car_price}</Td>
                    <Td>{item.credit_score}</Td>
                    <Td>{item.finance_decision}</Td>
                    <Td>{item.loan_term}</Td>
                    <Td>{item.loan_apr}</Td>
                    <Td>${item.monthly_payment}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
           </Box>
          )}
        </Box>
      </>
    );
  }