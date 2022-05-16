import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';

const BookingDetails = () => {
  return (
    <BookingContainer>
      <BookingStepper step={3} />
    </BookingContainer>
  );
};

export default BookingDetails;
