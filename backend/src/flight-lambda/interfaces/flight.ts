import { AirPort } from "../../airport-lambda/interfaces/airport.interface";

export interface Flight {
    id: string | number;
    duration: number;
    origin: AirPort;
    destination: AirPort;
    depart_date: string;
    arrival_date: string;
    price: number;
}