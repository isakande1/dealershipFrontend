import React from 'react';
import { Grid, Button } from "@chakra-ui/react";

export default function TestDriveForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted for scheduling test drive');
  };

  return (
    <Grid placeItems="center" bg="gray.700" p="20px">

        <p>heloo</p>
      <form onSubmit={handleSubmit}>
        {/* Form fields for scheduling test drive */}
        <Button type="submit" bg="#44337A" color="white" mt="10px">
          Submit
        </Button>
      </form>
    </Grid>
  );
}
