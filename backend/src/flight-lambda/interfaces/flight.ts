import { AirPort } from "../../airport-lambda/interfaces/airport.interface";

export interface Flight {
    id: string | number;
    startAirport: AirPort;
    destinationAirport: AirPort;
    departureTime: string;
    arrivalTime: string;
    price: number;
}