import { BookingStepper } from '@/components/BookingStepper';
import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Flight as FlightIcon } from '@mui/icons-material';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { AirPort } from '@/interfaces/airport';
import React from 'react';
import { Flight } from '@/interfaces/flight';
import { useSetRecoilState } from 'recoil';
import { selectedFlight } from 'atoms/selectedFlight';
import { useRouter } from 'next/router';
import { BookingContainer } from '@/components/BookingContainer';
interface SelectFlightProps {
  departure: AirPort;
  destination: AirPort;
  departureDate: string;
  flightList: Flight[];
}

const SelectFlight: NextPage<SelectFlightProps> = ({ ...props }) => {
  const router = useRouter();
  const setSelectedFlight = useSetRecoilState(selectedFlight);
  const chooseFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    router.push({
      pathname: '/booking/select-seat',
    });
  };
  return (
    <BookingContainer>
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
            Flight available at {props.departureDate}
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
                onClick={() => {
                  chooseFlight(flight);
                }}
                style={{
                  color: '#555555',
                  backgroundColor: '#FAFAFA',
                }}
              >
                <Stack width="100%" alignItems={'flex-start'}>
                  <Typography suppressHydrationWarning>
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
                      <Typography variant="h4" suppressHydrationWarning>
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
                      <Typography variant="h4" suppressHydrationWarning>
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
    </BookingContainer>
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
        depart_date: departureDate,
      }
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, query } = context;
  res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`);
  const allPromises = Promise.all([
    await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/airport/${query.origin}`
    ),
    await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/airport/${query.destination}`
    ),
  ]);
  const airports = await allPromises;
  const flights = await getFlight(
    airports[0].data,
    airports[1].data,
    `${query.depart_date}`
  );
  return {
    props: {
      departure: airports[0].data,
      destination: airports[1].data,
      departureDate: query.depart_date,
      flightList: flights.data,
    },
  };
};

export default SelectFlight;
