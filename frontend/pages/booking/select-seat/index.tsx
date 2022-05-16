import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';

const SelectSeat = () => {
  return (
    <BookingContainer>
      <BookingStepper step={1} />
    </BookingContainer>
  );
};

export default SelectSeat;
