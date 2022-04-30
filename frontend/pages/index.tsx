import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { mapTicketToString, TicketType } from '@/interfaces/TicketType';
import { Flight, Person } from '@mui/icons-material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { AirportListAutoComplete } from '@/components/AirportListAutoComplete';
import { AirPort } from '@/interfaces/airport';
import axios from 'axios';

interface HomePageProps {
  airports: AirPort[];
}
const Home: NextPage<HomePageProps> = ({ ...props }) => {
  const router = useRouter();
  const [ticketType, setTicketType] = useState<TicketType>(TicketType.ONE_WAY);
  const [departureLocation, setDepartureLocation] = useState<AirPort | null>(
    null
  );
  const [arrivalLocation, setArrivalLocation] = useState<AirPort | null>(null);
  const [departureDate, setdepartureDate] = useState<string>('');

  const [numOfPassengers, setNumOfPassengers] = useState<number>(1);
  const setTicket = (event: SelectChangeEvent) => {
    setTicketType(TicketType[event.target.value as keyof typeof TicketType]);
  };
  return (
    <div className={styles.container}>
      <Box
        sx={{
          width: '100%',
          minHeight: '45vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Image
          objectFit="cover"
          layout="fill"
          className={styles.landingPagePhoto}
          src="https://source.unsplash.com/random/?sydney,singapore,vietnam"
        />
        <Typography
          variant={'h2'}
          sx={{
            position: 'absolute',
            zIndex: 1,
            fontWeight: '400',
            color: '#F5F5F5',
            padding: '0 1.5em',
          }}
        >
          Book next your flight with confident
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          top: '-2em',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '70vw',
            color: '#F5F5F5',
            borderRadius: '2em',
            padding: '2em 3em',
            backgroundColor: '#003448',
          }}
        >
          <Stack direction="column" spacing={3}>
            <Typography
              variant={'h4'}
              sx={{ fontWeight: '300', paddingBottom: '0.5em' }}
            >
              G&apos;day mate, ready to spread your wing ?
            </Typography>

            <Stack direction="row" spacing={3}>
              <AirportListAutoComplete
                chosenAirport={departureLocation}
                disabledOption={arrivalLocation}
                onChange={setDepartureLocation}
                airports={props.airports}
                locationType="Departure"
              />
              <AirportListAutoComplete
                disabledOption={departureLocation}
                chosenAirport={arrivalLocation}
                onChange={setArrivalLocation}
                airports={props.airports}
                locationType="Destination"
              />
              <TextField
                fullWidth
                value={departureDate}
                onChange={(e) => setdepartureDate(e.target.value)}
                label={'Departure Date'}
                variant="filled"
                type="date"
                sx={{
                  backgroundColor: '#F5F5F5',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
            <Stack direction="row" spacing={3}>
              <Select
                value={ticketType}
                onChange={setTicket}
                sx={{
                  width: '10em',
                  backgroundColor: '#F5F5F5',
                }}
              >
                {Object.values(TicketType).map((value, i) => {
                  return (
                    <MenuItem
                      key={i}
                      value={value}
                      disabled={value === TicketType.ROUND_TRIP}
                    >
                      {mapTicketToString[value]}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                value={numOfPassengers}
                onChange={(e) =>
                  setNumOfPassengers(Number.parseInt(e.target.value))
                }
                inputProps={{
                  min: 1,
                }}
                InputProps={{
                  sx: {
                    width: '10em',
                    backgroundColor: '#F5F5F5',
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                type="number"
              />
            </Stack>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: '#FD7E14',
              }}
              endIcon={
                <Flight
                  style={{
                    color: '#4066B0',
                    transform: 'rotate(45deg)',
                    fontSize: '2em',
                  }}
                />
              }
              disabled={
                !departureLocation || !arrivalLocation || !departureDate
              }
              onClick={() =>
                router.push({
                  pathname: '/booking/select-flight',
                  query: {
                    departure: departureLocation?.id,
                    arrival: arrivalLocation?.id,
                    departureDate: departureDate,
                  },
                })
              }
            >
              <Typography>Search Flight!</Typography>
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/airport`
  );
  const airports = await res.data;
  return {
    props: {
      airports,
    },
  };
};

export default Home;
