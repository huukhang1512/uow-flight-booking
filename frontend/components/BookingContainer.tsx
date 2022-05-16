import { Container } from '@mui/material';
import { ReactNode } from 'react';

export const BookingContainer = (props: { children: ReactNode }) => {
  return (
    <Container
      sx={{
        flexDirection: 'column',
        padding: 3,
        minHeight: '90vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        direction: 'column',
        display: 'flex',
        gap: 4,
      }}
      maxWidth="lg"
    >
      {props.children}
    </Container>
  );
};
