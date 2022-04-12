import {
  AppBar,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { mapTicketToString, TicketType } from '@/interfaces/TicketType';
import { FlightLand, FlightTakeoff, Person } from '@mui/icons-material';
const Home: NextPage = () => {
  const router = useRouter();
  const [ticketType, setTicketType] = useState<TicketType>(TicketType.ONE_WAY);
  const [numOfPassengers, setNumOfPassengers] = useState<number>(1);
  const setTicket = (event: SelectChangeEvent) => {
    setTicketType(TicketType[event.target.value as keyof typeof TicketType]);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>FlyDream Airline</title>
        <meta
          name="description"
          content="FlyDreamAir is an affordable and trustworthy Airline"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className={styles.title}>
          Welcome to{' '}
          <a href="https://github.com/huukhang1512/uow-flight-booking">
            FlyDream Airline
          </a>
        </h1>

        <p className={styles.description}>
          G'day mate, ready to spread your wing ?
        </p>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" spacing={3}>
            <Select
              value={ticketType}
              onChange={setTicket}
              style={{
                width: '10em',
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
              style={{
                width: '10em',
              }}
              value={numOfPassengers}
              onChange={(e) =>
                setNumOfPassengers(Number.parseInt(e.target.value))
              }
              inputProps={{
                min: 1,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Person />
                  </InputAdornment>
                ),
              }}
              type="number"
            ></TextField>
          </Stack>
          <Stack direction="row" spacing={3}>
            <TextField
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FlightTakeoff />
                  </InputAdornment>
                ),
              }}
              label="Departure"
            />
            <TextField
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FlightLand />
                  </InputAdornment>
                ),
              }}
              label="Destination"
            />
            <TextField
              label={'Date'}
              variant="filled"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          <Button
            variant="contained"
            size="large"
            endIcon={<AirplaneTicketIcon />}
            onClick={() => router.push('/booking/select-flight')}
          >
            Search Flight
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Home;
