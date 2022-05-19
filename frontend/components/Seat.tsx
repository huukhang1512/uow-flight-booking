import React, { FC } from 'react';
import { Box } from "@mui/material"
import { ISeat } from '@/interfaces/seat'
import CheckIcon from '@mui/icons-material/Check';

type Props = {
  seat: ISeat,
  changeSelectedSeat: (seat: ISeat) => void;
  selected: boolean;
}

export const Seat: FC<Props> = (props) => {
  const { seat, changeSelectedSeat, selected } = props
  return (
    <Box
      sx={{
        width: 75,
        height: 75,
        borderRadius: 3,
        border: "2px solid #4066B0",
        m: "auto",
        background: seat.sold ? "#4066B0" : "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      onClick={() => changeSelectedSeat(seat)}
    >
      {selected ? <CheckIcon color="success" fontSize='large' /> : <></>}
    </Box >
  )
}