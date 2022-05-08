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
import { ArrowBack, ArrowForward, Flight } from '@mui/icons-material';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { AirPort } from '@/interfaces/airport';

interface SelectFlightProps {
  departure: AirPort;
  destination: AirPort;
}
const SelectFlight: NextPage<SelectFlightProps> = ({ ...props }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
          <Flight
            style={{
              color: '#4066B0',
              transform: 'rotate(90deg)',
            }}
          />
          <Typography variant={'body1'}>
            {props.departure.city.name} to {props.destination.city.name} -
          </Typography>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={0} aria-label="flight-class">
            <Tab value={0} label="Economy" />
            <Tab label="Business" disabled />
            <Tab label="First Class" disabled />
          </Tabs>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <IconButton>
            <ArrowBack />
          </IconButton>
          {days.map((day, i) => (
            <Button
              key={i}
              variant="contained"
              fullWidth
              style={{
                backgroundColor: '#FAFAFA',
              }}
            >
              <Stack>
                <Typography color="#4066B0">{day}</Typography>
                <Typography color="#FD7E14" variant="h5">
                  $480
                </Typography>
              </Stack>
            </Button>
          ))}
          <IconButton>
            <ArrowForward />
          </IconButton>
        </Stack>
        <Typography variant={'h6'}>Thursday 8 December 2022</Typography>
        <Button
          variant="contained"
          fullWidth
          style={{
            color: '#555555',
            backgroundColor: '#FAFAFA',
          }}
        >
          <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
            padding={3}
            width="100%"
            borderRadius={'0.5em'}
          >
            <Box>
              <Typography variant="h4">6:50am</Typography>
              <Typography variant="subtitle2">
                {props.departure.id} - Departure
              </Typography>
            </Box>
            <Box>
              <Flight
                style={{
                  transform: 'rotate(90deg)',
                }}
              />
            </Box>
            <Box>
              <Typography variant="h4">6:50am</Typography>
              <Typography variant="subtitle2">
                {props.destination.id} - Arival
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Direct Flight</Typography>
            </Box>
            <Box>
              <Typography variant="h5" color="#FD7E14">
                $480.00
              </Typography>
            </Box>
          </Stack>
        </Button>
      </Stack>
    </Container>
  );
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
  return {
    props: {
      departure: res[0].data,
      destination: res[1].data,
    },
  };
};

export default SelectFlight;
