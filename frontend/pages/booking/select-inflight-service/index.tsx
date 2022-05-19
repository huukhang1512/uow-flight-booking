import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';
import { InflightService } from '@/interfaces/inflightService';
import { ArrowForward, FoodBank, Theaters, WineBar } from '@mui/icons-material';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { inflightServices } from 'atoms/selectedInflightService';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

const SelectInFlightService = () => {
  const router = useRouter();
  const [services, setInflightServices] = useRecoilState(inflightServices);

  const handleChangeInflightServices = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const items = [...services];
    let copiedService = items[index];
    const newService = {
      ...copiedService,
      quantity: parseInt(e.target.value),
    };
    copiedService = newService;
    items.splice(index, 1, newService);
    setInflightServices(items);
  };
  const renderInflightService = (service: InflightService, index: number) => {
    const renderIcon = (serviceType: string) => {
      switch (serviceType) {
        case 'ENTERTAINMENT':
          return <Theaters style={{ fontSize: '3em' }} />;
        case 'WINE_AND_SPIRIT':
          return <WineBar style={{ fontSize: '3em' }} />;
        case 'FOOD_AND_BEVERAGE':
          return <FoodBank style={{ fontSize: '3em' }} />;
        default:
          return null;
      }
    };
    return (
      <Stack
        key={service.inflightServiceType}
        direction="row"
        alignItems="center"
        spacing={3}
        width={'100%'}
        justifyContent={'space-between'}
      >
        <Stack direction="row" alignItems="center" spacing={3}>
          {renderIcon(service.inflightServiceType)}
          <Typography variant="h6">{service.title}</Typography>
        </Stack>
        <TextField
          value={service.quantity}
          type="number"
          size={'small'}
          onChange={(e) => handleChangeInflightServices(e, index)}
          style={{ width: '15%' }}
        />
      </Stack>
    );
  };
  return (
    <BookingContainer>
      <BookingStepper step={2} />
      <Typography color={'#FD7E14'} variant={'h4'} >
        Make it your unique experience
      </Typography>
      <Stack direction="column" spacing={3}>
        {services.map((service: InflightService, i) =>
          renderInflightService(service, i)
        )}
        <Stack width="100%" alignItems="flex-end">
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: '#4066B0',
            }}
            endIcon={<ArrowForward />}
            onClick={() => router.push('/booking/booking-details')}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </BookingContainer>
  );
};

export default SelectInFlightService;
