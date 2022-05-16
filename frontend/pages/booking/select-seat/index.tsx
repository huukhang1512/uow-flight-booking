import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';
import { NextPage } from 'next';

const SelectSeat:NextPage = () => {
  return (
    <BookingContainer>
      <BookingStepper step={1} />
    </BookingContainer>
  );
};

export default SelectSeat;
