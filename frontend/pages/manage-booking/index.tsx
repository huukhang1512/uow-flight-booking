import { BookingContainer } from '@/components/BookingContainer';
import { FlightListItem } from '@/components/FlightListItem';
import { InflightService } from '@/interfaces/inflightService';
import { Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { bookings } from 'atoms/bookings';
import { NextPage } from 'next';
import React from 'react';
import { useRecoilValue } from 'recoil';

const ManageBooking: NextPage = () => {
  const bookingLists = useRecoilValue(bookings);
  const calcTotalPrice = (booking: typeof bookingLists[0]) => {
    return (
      booking.selectedFlight.price +
      booking.inflightServices.reduce(
        (acc: number, service: InflightService) =>
          acc + service.price * service.quantity,
        0
      )
    );
  };
  return (
    <BookingContainer>
      <Typography variant={'h4'}>List of your bookings:</Typography>
      {bookingLists.length === 0 && (
        <Typography variant={'subtitle1'}>Your booked flights will be shown here</Typography>
      )}
      {bookingLists.map(
        (booking: typeof bookingLists.bookings[0], index: number) => {
          return (
            <Stack
              width={'100%'}
              boxShadow={`4px 5px 2px 1px #555555`}
              border={'1px solid #555555'}
              borderRadius={'1em'}
              style={{
                color: '#555555',
                backgroundColor: '#FAFAFA',
              }}
              divider={<Divider />}
            >
              <FlightListItem
                key={index}
                arrival_date={booking.selectedFlight.arrival_date}
                depart_date={booking.selectedFlight.depart_date}
                origin={booking.selectedFlight.origin}
                destination={booking.selectedFlight.destination}
                price={booking.selectedFlight.price}
              />
              <Box width="100%">
                <Stack direction="column" padding={3}>
                  {booking.inflightServices.map(
                    (service: InflightService, j: number) => {
                      return (
                        <Stack
                          direction="row"
                          justifyContent={'space-between'}
                          key={j}
                        >
                          <Typography variant="h5">
                            {service.title} : {service.quantity}
                          </Typography>
                          <Typography variant="h5" color={'#FD7E14'}>
                            AUD ${service.price * service.quantity}
                          </Typography>
                        </Stack>
                      );
                    }
                  )}
                </Stack>
              </Box>
              <Box width="100%" padding={3}>
                <Stack
                  alignItems="center"
                  justifyContent="end"
                  width="100%"
                  direction="row"
                  spacing={2}
                >
                  <Typography variant="h5" color="#4066B0">
                    Total: AUD ${calcTotalPrice(booking)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          );
        }
      )}
    </BookingContainer>
  );
};

export default ManageBooking;
