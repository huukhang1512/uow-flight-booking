export enum TicketType {
  ONE_WAY = 'ONE_WAY',
  ROUND_TRIP = 'ROUND_TRIP',
}

export const mapTicketToString: Record<TicketType, string> = {
  [TicketType.ONE_WAY]: 'One Way',
  [TicketType.ROUND_TRIP]: 'Round Trip',
};