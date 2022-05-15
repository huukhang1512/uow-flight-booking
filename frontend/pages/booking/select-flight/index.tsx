import { BookingStepper } from '@/components/BookingStepper';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Flight as FlightIcon } from '@mui/icons-material';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { AirPort } from '@/interfaces/airport';
import React, { useEffect, useState } from 'react';
import { Flight } from '@/interfaces/flight';

interface SelectFlightProps {
  departure: AirPort;
  destination: AirPort;
  departureDate: string;
  flightList: Flight[];
}
const SelectFlight: NextPage<SelectFlightProps> = ({ ...props }) => {
  return (
    <Container
      sx={{
        flexDirection: 'column',
        padding: 3,
        minHeight: '90vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        direction: 'column',
        display: 'flex',
        gap: 4,
      }}
      maxWidth="lg"
    >
      <BookingStepper step={0} />
      <Typography variant={'h1'} fontWeight={'medium'} sx={{ fontSize: '3em' }}>
        {props.departure.city.name} To {props.destination.city.name}
      </Typography>
      <Typography variant={'subtitle1'}>
        The fares include 7kg carry-on baggage. You can buy more in the next
        steps.
      </Typography>
      <Stack
        justifyContent={'flex-start'}
        spacing={2}
        direction="column"
        width={'100%'}
      >
        <Typography
          variant={'h2'}
          fontWeight={'medium'}
          sx={{ fontSize: '2em' }}
        >
          Departing Flight
        </Typography>
        <Stack spacing={1} alignItems={'center'} direction="row" width={'100%'}>
          <FlightIcon
            style={{
              color: '#4066B0',
              transform: 'rotate(90deg)',
            }}
          />
          <Typography variant={'body1'}>
            {props.departure.city.name} to {props.destination.city.name} -{' '}
            Flight available at{' '}
            {('0' + (new Date(props.departureDate).getMonth() + 1)).slice(-2)}/
            {new Date(props.departureDate).getFullYear()}
          </Typography>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={0} aria-label="flight-class">
            <Tab value={0} label="Economy" />
            <Tab label="Business" disabled />
            <Tab label="First Class" disabled />
          </Tabs>
        </Box>
        {props.flightList.length == 0 ? (
          <Typography>No flight found this month!</Typography>
        ) : (
          props.flightList.map((flight, i) => (
            <React.Fragment key={i}>
              <Button
                variant="contained"
                fullWidth
                style={{
                  color: '#555555',
                  backgroundColor: '#FAFAFA',
                }}
              >
                <Stack width="100%" alignItems={'flex-start'}>
                  <Typography>
                    {new Date(flight.depart_date).toLocaleDateString()}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    padding={3}
                    width="100%"
                    borderRadius={'0.5em'}
                  >
                    <Box>
                      <Typography variant="h4">
                        {new Date(flight.depart_date).toLocaleTimeString()}
                      </Typography>
                      <Typography variant="subtitle2">
                        {props.departure.name} - Departure
                      </Typography>
                    </Box>
                    <Box>
                      <FlightIcon
                        style={{
                          transform: 'rotate(90deg)',
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h4">
                        {new Date(flight.arrival_date).toLocaleTimeString()}
                      </Typography>
                      <Typography variant="subtitle2">
                        {props.destination.name} - Arival
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Direct Flight</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5" color="#FD7E14">
                        AUD ${flight.price}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Button>
            </React.Fragment>
          ))
        )}
      </Stack>
    </Container>
  );
};
const getFlight = async (
  departure: AirPort,
  destination: AirPort,
  departureDate: string
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/flight`,
      {
        origin: departure.name,
        destination: destination.name,
        depart_date: `${new Date(departureDate).getFullYear()}-${(
          '0' +
          (new Date(departureDate).getMonth() + 1)
        ).slice(-2)}`,
      }
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const allPromises = Promise.all([
    await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/airport/${query.departure}`
    ),
    await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/airport/${query.arrival}`
    ),
  ]);
  const res = await allPromises;
  const flights = await getFlight(
    res[0].data,
    res[1].data,
    `${query.departureDate}`
  );
  return {
    props: {
      departure: res[0].data,
      destination: res[1].data,
      departureDate: query.departureDate,
      flightList: flights.data,
    },
  };
};

export default SelectFlight;
