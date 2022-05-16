import { InflightService } from '@/interfaces/inflightService';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()
export const inflightServices = atom<InflightService[]>({
  key: 'inflightServices',
  default: [
    {
      inflightServiceType: 'ENTERTAINMENT',
      title: 'Entertainment',
      quantity: 0,
      price: 10,
    },
    {
      inflightServiceType: 'WINE_AND_SPIRIT',
      title: 'Wine & Spirit',
      quantity: 0,
      price: 20,
    },
    {
      inflightServiceType: 'FOOD_AND_BEVERAGE',
      title: 'Food & Beverage',
      quantity: 0,
      price: 15,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
