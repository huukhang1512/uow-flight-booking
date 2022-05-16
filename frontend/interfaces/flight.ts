import { AirPort } from "./airport";
export interface Flight {
    origin: AirPort;
    destination: AirPort;
    depart_date: string;
    arrival_date: string;
    price: number;
}