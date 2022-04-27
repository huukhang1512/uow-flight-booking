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
import { Flight, FlightLand, FlightTakeoff, Person } from '@mui/icons-material';
import { Box } from '@mui/system';
import Image from 'next/image';

const Home: NextPage = () => {
  const router = useRouter();
  const [ticketType, setTicketType] = useState<TicketType>(TicketType.ONE_WAY);
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
              <TextField
                variant="filled"
                fullWidth
                sx={{
                  backgroundColor: '#F5F5F5',
                }}
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
                fullWidth
                sx={{
                  backgroundColor: '#F5F5F5',
                }}
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
                fullWidth
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
              onClick={() => router.push('/booking/select-flight')}
            >
              <Typography>Search Flight!</Typography>
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
