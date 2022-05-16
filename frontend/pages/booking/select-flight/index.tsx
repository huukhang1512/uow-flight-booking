import { BookingStepper } from '@/components/BookingStepper';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Flight as FlightIcon } from '@mui/icons-material';
import axios from 'axios';
import { NextPage } from 'next';
import { AirPort } from '@/interfaces/airport';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Flight } from '@/interfaces/flight';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedFlight } from 'atoms/selectedFlight';
import { useRouter } from 'next/router';
import { BookingContainer } from '@/components/BookingContainer';
import { FlightListItem } from '@/components/FlightListItem';
import { chosenRoute } from 'atoms/chosenRoute';

const SelectFlight: NextPage = () => {
  const router = useRouter();
  const setSelectedFlight = useSetRecoilState(selectedFlight);
  const [routeChosen, setRouteChosen] = useRecoilState(chosenRoute);
  const [origin, setOrigin] = useState<AirPort>();
  const [destination, setDestination] = useState<AirPort>();
  const [flightList, setFlightList] = useState<Flight[]>();
  const [loading, setLoading] = useState(true);

  const chooseFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    router.push({
      pathname: '/booking/select-seat',
    });
  };
  const changeDepartureMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setRouteChosen({ ...routeChosen, depart_date: e.target.value });
    router.query.depart_date = e.target.value;
    router.push(router);
  };

  const getFlightAndAirportDetails = async () => {
    try {
      setLoading(true);
      const allPromises = Promise.all([
        await axios.get(`/api/airport/${router.query.origin}`),
        await axios.get(`/api/airport/${router.query.destination}`),
      ]);
      const airports = await allPromises;
      setOrigin(airports[0].data);
      setDestination(airports[1].data);

      const flight = await axios.post(`/api/flight`, {
        data: {
          origin: airports[0].data.name,
          destination: airports[1].data.name,
          depart_date: router.query.depart_date,
        },
      });
      setFlightList(flight.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (!router.isReady) return;
    getFlightAndAirportDetails();
  }, [router.isReady, router.query.depart_date]);

  if (loading) {
    return (
      <Container
        sx={{
          flexDirection: 'column',
          padding: 3,
          minHeight: '90vh',
          alignItems: 'center',
          justifyContent: 'center',
          direction: 'column',
          display: 'flex',
          gap: 4,
        }}
        maxWidth="lg"
      >
        <CircularProgress />
      </Container>
    );
  }
  return (
    <BookingContainer>
      <BookingStepper step={0} />
      <Typography variant={'h1'} fontWeight={'medium'} sx={{ fontSize: '3em' }}>
        {origin?.city.name} To {destination?.city.name}
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
            width={'100%'}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <FlightIcon
                style={{
                  color: '#4066B0',
                  transform: 'rotate(90deg)',
                }}
              />
              <Typography variant={'body1'}>
                {origin?.city.name} to {destination?.city.name} - Flight
                available at {routeChosen.depart_date}
              </Typography>
            </Stack>
            <TextField
              value={routeChosen.depart_date}
              onChange={changeDepartureMonth}
              size="small"
              label={'Change Departure Month'}
              type="month"
              sx={{
                backgroundColor: '#F5F5F5',
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={0} aria-label="flight-class">
            <Tab value={0} label="Economy" />
            <Tab label="Business" disabled />
            <Tab label="First Class" disabled />
          </Tabs>
        </Box>
        {flightList?.length == 0 ? (
          <Typography>No flight found this month!</Typography>
        ) : (
          flightList?.map((flight, i) => (
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
                <FlightListItem
                  arrival_date={flight.arrival_date}
                  depart_date={flight.depart_date}
                  origin={flight.origin}
                  destination={flight.destination}
                  price={flight.price}
                />
              </Button>
            </React.Fragment>
          ))
        )}
      </Stack>
    </BookingContainer>
  );
};

export default SelectFlight;
