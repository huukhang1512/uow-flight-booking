import { Step, StepLabel, Stepper } from '@mui/material';
import { chosenRoute } from 'atoms/chosenRoute';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

interface BookingStepperProps {
  step: number;
}
export const BookingStepper = (props: BookingStepperProps) => {
  const router = useRouter();
  const routeChosen = useRecoilValue(chosenRoute);
  const steps = [
    {
      label: 'Select Flight',
      stepIndex: 0,
      path: '/select-flight',
      query: {
        origin: routeChosen.origin,
        destination: routeChosen.destination,
        depart_date: routeChosen.depart_date,
      },
    },
    {
      label: 'Select Seat',
      stepIndex: 1,
      path: '/select-seat',
    },
    {
      label: 'Select Inflight Service',
      stepIndex: 2,
      path: '/select-inflight-service',
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
          onClick={() =>
            router.push({
              pathname: `/booking/${step.path}`,
              query: step.query,
            })
          }
        >
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
