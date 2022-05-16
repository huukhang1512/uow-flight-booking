import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
export const chosenRoute = atom({
  key: 'chosenRoute',
  default: {
    origin: '',
    destination: '',
    depart_date: '',
  },
  effects_UNSTABLE: [persistAtom],
});
