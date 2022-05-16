import { AirPort } from "./airport";
export interface Flight {
    origin: string;
    destination: string;
    depart_date: string;
    arrival_date: string;
    price: number;
}