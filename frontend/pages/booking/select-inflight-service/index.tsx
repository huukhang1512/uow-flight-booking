import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';

const SelectInFlightService = () => {
  return (
    <BookingContainer>
      <BookingStepper step={2} />
    </BookingContainer>
  );
};

export default SelectInFlightService;
