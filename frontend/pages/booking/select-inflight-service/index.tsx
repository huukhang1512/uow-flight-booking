import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';

const SelectSeat = () => {
  return (
    <BookingContainer>
      <BookingStepper step={2} />
    </BookingContainer>
  );
};

export default SelectSeat;
