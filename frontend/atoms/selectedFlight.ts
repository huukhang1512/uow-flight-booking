import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()
export const selectedFlight = atom({
  key: 'selectedFlight',
  default: {
    origin: {
      id: '',
      city: {
        name: '',
        country: {
          countryName: '',
        },
      },
      name: '',
    },
    destination: {
      id: '',
      city: {
        name: '',
        country: {
          countryName: '',
        },
      },
      name: '',
    },
    depart_date: '',
    arrival_date: '',
    price: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
