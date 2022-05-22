import { BookingDetails } from '@/interfaces/bookingDetails';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
export const bookingDetails = atom<BookingDetails>({
  key: 'bookingDetails',
  default: {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    suburb: '',
    state: '',
  },
  effects_UNSTABLE: [persistAtom],
});
