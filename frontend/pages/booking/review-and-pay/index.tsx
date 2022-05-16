import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';
import { Payment } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { selectedFlight } from 'atoms/selectedFlight';
import { useRecoilValue } from 'recoil';

const SelectSeat = () => {
  const flightChosen = useRecoilValue(selectedFlight);
  return (
    <BookingContainer>
      <BookingStepper step={4} />
      <Typography variant="h4">
        You all set! Below is your booking summary
      </Typography>
      <Stack
        alignItems="center"
        justifyContent="end"
        width="100%"
        direction="row"
        spacing={2}
      >
        <Typography>{flightChosen.price}</Typography>
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: '#FD7E14',
          }}
          endIcon={<Payment />}
        >
          Confirm &amp; Pay
        </Button>
      </Stack>
    </BookingContainer>
  );
};

export default SelectSeat;
