import { AirPort } from '@/interfaces/airport';
import { FlightTakeoff } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export const AirportListAutoComplete = () => {
  const [airports, setAirports] = useState<AirPort[]>([]);
  const getAirports = async () => {
    const { data } = await axios.get('https://localhost:3001/airports', {
        params: {
            queryStringParameters: {
                searchQuery
            }
        }
    });
    setAirports(data);
  };
  return (
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
  );
};
