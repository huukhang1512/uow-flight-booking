import { AirPort } from '@/interfaces/airport';
import { FlightLand, FlightTakeoff } from '@mui/icons-material';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import React from 'react';
interface AirportListAutoCompleteProps {
  locationType: 'Departure' | 'Destination';
  airports: AirPort[];
  chosenAirport: AirPort | null;
  disabledOption?: AirPort | null;
  onChange: (arg: AirPort | null) => void;
}

export const AirportListAutoComplete = ({
  onChange,
  disabledOption,
  chosenAirport,
  locationType,
  airports,
}: AirportListAutoCompleteProps) => {
  return (
    <Autocomplete
      options={airports}
      value={chosenAirport}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      getOptionDisabled={(option) =>
        option === disabledOption
      }
      getOptionLabel={(option) => `${option.city.name} - ${option.name}`}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          fullWidth
          sx={{
            backgroundColor: '#F5F5F5',
          }}
          label={locationType}
        />
      )}
    />
  );
};
