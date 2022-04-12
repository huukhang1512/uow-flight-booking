import { AppBar, Toolbar, Button,  } from '@mui/material';
import FDALogo from '@/public/logo.svg';
import { CheckBoxOutlined, FlightOutlined, MenuBookOutlined } from '@mui/icons-material';
export const NavigationBar = () => {
  return (
    <AppBar style={{ padding: '1em', background: 'none' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FDALogo />
        <div>
          <Button
            size="large"
            style={{ textTransform: 'none', color: '#003448' }}
            startIcon={
              <FlightOutlined style={{ transform: 'rotate(90deg)' }} />
            }
          >
            Flight Status
          </Button>
          <Button
            size="large"
            style={{ textTransform: 'none', color: '#003448' }}
            startIcon={<MenuBookOutlined />}
          >
            Manage Booking
          </Button>

          <Button
            size="large"
            style={{ textTransform: 'none', color: '#003448' }}
            startIcon={<CheckBoxOutlined />}
          >
            Check-in
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
