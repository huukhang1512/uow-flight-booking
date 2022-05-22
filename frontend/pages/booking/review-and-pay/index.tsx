import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';
import { FlightListItem } from '@/components/FlightListItem';
import { Payment } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { bookingDetails } from 'atoms/bookingDetails';
import { bookings } from 'atoms/bookings';
import { chosenRoute } from 'atoms/chosenRoute';
import { selectedFlight } from 'atoms/selectedFlight';
import { inflightServices } from 'atoms/selectedInflightService';
import { seat } from 'atoms/selectedSeat';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

const ReviewAndPay: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const flightChosen = useRecoilValue(selectedFlight);
  const services = useRecoilValue(inflightServices);
  const selectedSeat = useRecoilValue(seat);
  const [bookingList, setBookingList] = useRecoilState(bookings);

  const resetFlightChosen = useResetRecoilState(selectedFlight);
  const resetServices = useResetRecoilState(inflightServices);
  const resetChosenSeat = useResetRecoilState(seat);
  const resetBookingDetails = useResetRecoilState(bookingDetails);
  const resetChosenRoute = useResetRecoilState(chosenRoute);

  const calcTotalPrice = () => {
    return (
      flightChosen.price +
      services.reduce(
        (acc, service) => acc + service.price * service.quantity,
        0
      )
    );
  };
  const processPayment = () => {
    const newBooking = {
      selectedFlight: flightChosen,
      inflightServices: services,
      seat: selectedSeat,
    };
    setBookingList([...bookingList, newBooking]);
    setLoading(true);
    resetFlightChosen();
    resetServices();
    resetChosenSeat();
    resetChosenRoute();
    resetBookingDetails();
    router.push('/manage-booking');
  };
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
      <Box
        width="100%"
        borderRadius={'1em'}
        border={'1px solid #555555'}
        boxShadow={`4px 5px 2px 1px #555555`}
        style={{
          color: '#555555',
          padding: 5,
          backgroundColor: '#FAFAFA',
        }}
      >
        <Stack direction="column" padding={3}>
          {services.map((service, i) => {
            return (
              <Stack key={i} direction="row" justifyContent={'space-between'}>
                <Typography variant="h5">
                  {service.title} : {service.quantity}
                </Typography>
                <Typography variant="h5" color={'#FD7E14'}>
                  AUD ${service.price * service.quantity}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <Stack
        alignItems="center"
        justifyContent="end"
        width="100%"
        direction="row"
        spacing={2}
      >
        <Typography variant="h5" color="#4066B0">
          AUD ${calcTotalPrice()}
        </Typography>
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: '#FD7E14',
          }}
          endIcon={<Payment />}
          onClick={() => processPayment()}
        >
          Confirm &amp; Pay
        </Button>
      </Stack>
    </BookingContainer>
  );
};

export default ReviewAndPay;
