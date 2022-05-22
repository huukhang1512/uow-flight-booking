import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
export const bookings = atom({
  key: 'bookings',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
