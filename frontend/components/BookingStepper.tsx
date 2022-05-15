import { Step, StepLabel, Stepper } from '@mui/material';
import { useRouter } from 'next/router';

interface BookingStepperProps {
  step: number;
}
export const BookingStepper = (props: BookingStepperProps) => {
  const router = useRouter();
  const steps = [
    {
      label: 'Select Flight',
      stepIndex: 0,
      path: '/select-flight',
    },
    {
      label: 'Select Seat',
      stepIndex: 1,
      path: '/select-seat',
    },
    {
      label: 'Select Inflight Service',
      stepIndex: 2,
      path: '/select-inflightService',
    },
    {
      label: 'Booking Details',
      stepIndex: 3,
      path: '/booking-details',
    },
    {
      label: 'Review Booking and Pay',
      stepIndex: 4,
      path: '/review-and-pay',
    },
  ];
  return (
    <Stepper activeStep={props.step} alternativeLabel>
      {steps.map((step) => (
        <Step
          key={step.stepIndex}
          onClick={() => router.push(`/booking/${step.path}`)}
        >
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
