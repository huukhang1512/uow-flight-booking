import { atom } from 'recoil';
export const inflightService = atom({
  key: 'inflightService',
  default: {
    services: [
      {
        inflightServiceType: 'ENTERTAINMENT',
        title: 'Entertainment',
        quantity: 0,
      },
      {
        inflightServiceType: 'WINE_AND_SPIRIT',
        title: 'Wine & Spirit',
        quantity: 0,
      },
      {
        inflightServiceType: 'FOOD_AND_BEVERAGE',
        title: 'Food & Beverage',
        quantity: 0,
      },
    ],
  },
});
