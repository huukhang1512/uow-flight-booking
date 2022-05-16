export interface AirPort {
    id: string;
    city: City;
    name: string;
}

export interface City {
    name: string;
    country: Country;
}

export interface Country {
    countryName: string;
}
