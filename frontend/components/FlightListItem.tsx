import { Flight } from '@/interfaces/flight';
import { Stack, Typography } from '@mui/material';
import { Flight as FlightIcon } from '@mui/icons-material';
import { Box } from '@mui/system';
import { AirPort } from '@/interfaces/airport';
interface FlightListItemProps {
  depart_date: Flight['depart_date'];
  arrival_date: Flight['arrival_date'];
  origin: AirPort['name'];
  destination: AirPort['name'];
  price: Flight['price'];
}
export const FlightListItem = (props: FlightListItemProps) => {
  const { depart_date, arrival_date, origin, destination, price } = props;
  return (
    <Stack width="100%" alignItems={'flex-start'} padding={3}>
      <Typography suppressHydrationWarning>
        {new Date(depart_date).toLocaleDateString()}
      </Typography>
      <Stack
        direction="row"
        justifyContent={'space-between'}
        alignItems={'center'}
        width="100%"
        borderRadius={'0.5em'}
      >
        <Box>
          <Typography variant="h4" suppressHydrationWarning>
            {new Date(depart_date).toLocaleTimeString()}
          </Typography>
          <Typography variant="subtitle2">{origin} - Departure</Typography>
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
            {new Date(arrival_date).toLocaleTimeString()}
          </Typography>
          <Typography variant="subtitle2">{destination} - Arival</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Direct Flight</Typography>
        </Box>
        <Box>
          <Typography variant="h5" color="#FD7E14">
            AUD ${price}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
