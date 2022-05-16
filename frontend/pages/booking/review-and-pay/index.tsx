import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';
import { FlightListItem } from '@/components/FlightListItem';
import { Payment } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { selectedFlight } from 'atoms/selectedFlight';
import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';

const ReviewAndPay:NextPage = () => {
  const flightChosen = useRecoilValue(selectedFlight);
  return (
    <BookingContainer>
      <BookingStepper step={4} />
      <Typography variant="h4">
        You all set! Below is your booking summary
      </Typography>
      <Box
        width="100%"
        borderRadius={'1em'}
        boxShadow={`4px 5px 2px 1px #555555`}
        border={'1px solid #555555'}
        style={{
          color: '#555555',
          padding: 5,
          backgroundColor: '#FAFAFA',
        }}
      >
        <FlightListItem
          arrival_date={flightChosen.arrival_date}
          depart_date={flightChosen.depart_date}
          origin={flightChosen.origin}
          destination={flightChosen.destination}
          price={flightChosen.price}
        />
      </Box>
      <Stack
        alignItems="center"
        justifyContent="end"
        width="100%"
        direction="row"
        spacing={2}
      >
        <Typography variant="h5" color="#4066B0">
          AUD ${flightChosen.price}
        </Typography>
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

export default ReviewAndPay;
