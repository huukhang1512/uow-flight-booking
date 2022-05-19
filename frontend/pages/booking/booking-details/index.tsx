import { BookingContainer } from '@/components/BookingContainer';
import { BookingStepper } from '@/components/BookingStepper';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { ArrowForward } from '@mui/icons-material';
import { useRouter } from 'next/router';

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  suburb: '',
  state: '',
}

export const bookingDetailsSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .max(255)
    .required('Please enter your email'),
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  address: Yup.string().required('Please enter your address'),
  suburb: Yup.string().required('Please enter your suburb'),
  state: Yup.string().required('Please enter your state')
})

const BookingDetails = () => {

  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: bookingDetailsSchema,
    onSubmit: async (values) => {
      router.push('/booking/review-and-pay')
    }
  })

  const onNext = () => {
    formik.submitForm();
  }

  return (
    <BookingContainer>
      <BookingStepper step={3} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography color={'#FD7E14'} variant={'h4'} textAlign={"center"}>
            Booking Details
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container columnSpacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
              </Grid >
              <Grid item xs={12} md={6}>

                <TextField
                  autoFocus
                  error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                  fullWidth
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.firstName}
                />
              </Grid >
              <Grid item xs={12} md={6}>
                <TextField
                  autoFocus
                  error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.lastName}
                />
              </Grid >
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  error={Boolean(formik.touched.address && formik.errors.address)}
                  fullWidth
                  helperText={formik.touched.address && formik.errors.address}
                  label="Address"
                  margin="normal"
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.address}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoFocus
                  error={Boolean(formik.touched.suburb && formik.errors.suburb)}
                  fullWidth
                  helperText={formik.touched.suburb && formik.errors.suburb}
                  label="Suburb"
                  margin="normal"
                  name="suburb"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.suburb}
                />
              </Grid >
              <Grid item xs={12} md={6}>
                <TextField
                  autoFocus
                  error={Boolean(formik.touched.state && formik.errors.state)}
                  fullWidth
                  helperText={formik.touched.state && formik.errors.state}
                  label="State"
                  margin="normal"
                  name="state"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.state}
                />
              </Grid>
            </Grid>
          </form>
        </Grid >
      </Grid >
      <Stack width="100%" alignItems="flex-end">
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: '#4066B0',
          }}
          endIcon={<ArrowForward />}
          onClick={onNext}
        >
          Next
        </Button>
      </Stack>
    </BookingContainer>

  );
};

export default BookingDetails;
