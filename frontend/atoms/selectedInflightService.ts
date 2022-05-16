import { atom } from 'recoil';
export const inflightService = atom({
  key: 'inflightService',
  default: {
    services: [
      {
        inflightServiceType: 'ENTERTAINMENT',
        quantity: 0,
      },
      {
        inflightServiceType: 'WINE',
        quantity: 0,
      },
      {
        inflightServiceType: 'FOOD_AND_BEVERAGE',
        quantity: 0,
      },
    ],
  },
});
