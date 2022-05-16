import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';
import { Box } from '@mui/system';

const BookingDetails = () => {
  return (
    <BookingContainer>
      <BookingStepper step={3} />
    </BookingContainer>
  );
};

export default BookingDetails;
