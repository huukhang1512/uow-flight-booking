import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()
export const selectedFlight = atom({
  key: 'selectedFlight',
  default: {
    origin: '',
    destination: '',
    depart_date: '',
    arrival_date: '',
    price: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
