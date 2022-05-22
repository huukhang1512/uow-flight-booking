import { ISeat } from '@/interfaces/seat';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const seat = atom<ISeat>({
  key: 'seat',
  default: {
    sold: false,
    row: 0,
    column: "",
  },
  effects_UNSTABLE: [persistAtom],
});
