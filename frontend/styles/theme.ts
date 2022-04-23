import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiInputBase: {
          styleOverrides: {
            root: {
              backgroundColor: '#FFFFFF',
              '&.Mui-disabled': {
                backgroundColor: '#E4E4E4',
              },
            },
          },
        },
      },
})