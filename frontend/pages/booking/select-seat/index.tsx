import React, { useEffect, useState } from 'react';
import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Button, Stack, Grid, Typography, Snackbar, Alert } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Image from 'next/image';
import { Seat } from '../../../components/Seat'
import airplane from '../../../public/airplane.png';
import { ISeat } from '@/interfaces/seat'

const genRandomSold = () => {
  const num = Math.random();
  if (num < 0.3) return true;  //probability 0.3
  else return false; // probability 0.7
}

const genRandomSeat = (): ISeat[] => {
  const seats: ISeat[] = []
  for (let i = 1; i < 7; i++) {
    seats.push({
      sold: genRandomSold(),
      row: i,
      column: "A"
    })
    seats.push({
      sold: genRandomSold(),
      row: i,
      column: "B"
    })
    seats.push({
      sold: genRandomSold(),
      row: i,
      column: "C"
    })
    seats.push({
      sold: genRandomSold(),
      row: i,
      column: "D"
    })
  }
  return seats
}

const SelectSeat:NextPage = () => {
  const [open, setOpen] = useState(false);
  const [allSeats, setAllSeats] = useState<ISeat[]>([])
  const [selectedSeat, setSelectedSeat] = useState<ISeat | undefined>(undefined)
  const router = useRouter();

  useEffect(() => {
    setAllSeats(genRandomSeat())
  }, [])
  const handleSnackBarClose = () => {
    setOpen(false);
  }
  const isSelected = (seat: ISeat): boolean => {
    return seat.row === selectedSeat?.row && seat.column === selectedSeat?.column
  }

  const genSeatSelect = (seats: ISeat[]) => {
    const seatA = seats.filter(seat => seat.column == "A")
    const seatB = seats.filter(seat => seat.column == "B")
    const seatC = seats.filter(seat => seat.column == "C")
    const seatD = seats.filter(seat => seat.column == "D")

    return seatA.map((sA: ISeat, index: number) => {
      return (<React.Fragment key={index}>
        <Grid item container justifyContent={"center"} alignItems={"center"} xs={1}>
          <Typography variant={'h5'} component={'h4'} >
            {index + 1}
          </Typography>
        </Grid>
        <Grid item container xs={5}  >
          <Grid item xs={6}>
            <Seat seat={sA} selected={isSelected(sA)} changeSelectedSeat={changeSelectedSeat} />
          </Grid>
          <Grid item xs={6}>
            <Seat seat={seatB[index]} selected={isSelected(seatB[index])} changeSelectedSeat={changeSelectedSeat} />
          </Grid>
        </Grid>
        <Grid item container xs={1}>
        </Grid>
        <Grid item container xs={5} >
          <Grid item xs={6}>
            <Seat seat={seatC[index]} selected={isSelected(seatC[index])} changeSelectedSeat={changeSelectedSeat} />
          </Grid>
          <Grid item xs={6}>
            <Seat seat={seatD[index]} selected={isSelected(seatD[index])} changeSelectedSeat={changeSelectedSeat} />
          </Grid>
        </Grid>
        </React.Fragment>)
    })
  }

  const changeSelectedSeat = (seat: ISeat) => {
    if (seat.sold) {
      return;
    }
    setSelectedSeat(seat)
  }

  const onNext = () => {
    if (selectedSeat) {
      router.push('/booking/select-inflight-service')
    } else {
      setOpen(true)
    }
  }

  return (
    <BookingContainer>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="warning" sx={{ width: '100%' }}>
          Please select a seat before moving on
        </Alert>
      </Snackbar>
      <BookingStepper step={1} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography color={'#FD7E14'} variant={'h4'} textAlign={"center"}>
            Choose your best seat
          </Typography>
        </Grid>
        <Grid item container spacing={3} xs={12} lg={6} textAlign={"center"}>
          <Grid item container xs={1}>
          </Grid>
          <Grid item container xs={5} >
            <Grid item xs={6}>
              <Typography variant={'h5'} component={'h4'} >
                A
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant={'h5'} component={'h4'} >
                B
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={1}>
          </Grid>
          <Grid item container xs={5}>
            <Grid item xs={6}>
              <Typography variant={'h5'} component={'h4'} >
                C
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant={'h5'} component={'h4'} >
                D
              </Typography>
            </Grid>
          </Grid>
          {genSeatSelect(allSeats)}
        </Grid>
        <Grid item lg={6} xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Image
            width={400}
            height={400}
            src={airplane}
          />
        </Grid>
      </Grid>
      <Stack width="100%" alignItems="flex-end">
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: '#4066B0',
          }}
          endIcon={<ArrowForward />}
          onClick={onNext}
        >
          Next
        </Button>
      </Stack>
    </BookingContainer>
  );
};

export default SelectSeat;
