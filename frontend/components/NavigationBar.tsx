import { AppBar, Toolbar, Button, Stack } from '@mui/material';
import FDALogo from '@/public/logo.svg';
import {
  CheckBoxOutlined,
  FlightOutlined,
  MenuBookOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

export const NavigationBar = () => {
  const router = useRouter();
  const navigationRoutes = [
    {
      title: 'Flight Status',
      key: '/',
      icon: <FlightOutlined style={{ transform: 'rotate(90deg)' }} />,
    },
    {
      title: 'Manage Booking',
      key: '/manage-booking',
      icon: <MenuBookOutlined />,
    },
    { title: 'Check-in', key: '/', icon: <CheckBoxOutlined /> },
  ];
  return (
    <AppBar
      style={{ padding: '1em', background: 'none' }}
      position={'relative'}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => router.push('/')}>
          <FDALogo />
        </Button>
        <Stack direction="row" spacing={3}>
          {navigationRoutes.map((route, i) => {
            return (
              <Button
                key={i}
                size="large"
                style={{ textTransform: 'none', color: '#003448' }}
                startIcon={route.icon}
              >
                {route.title}
              </Button>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
