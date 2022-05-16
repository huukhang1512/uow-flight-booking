import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import axios from "axios";
import { Flight } from "./interfaces/flight";

export const getFlights = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    const body = JSON.parse(event.body ?? "");
    const params = {
      origin: body?.origin,
      destination: body?.destination,
      depart_date: body?.depart_date, // will be in year-month format
      currency: "AUD",
      limit: "10",
    };

    const headers = {
      "X-Access-Token": process.env.TRAVEL_PAYOUT_ACCESS_TOKEN || "",
      "X-RapidAPI-Host":
        "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.TRAVEL_PAYOUT_API_KEY || "",
    };

    const url =
      "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/nearest-places-matrix";

    const res = await axios.get(url, { headers, params });
    const data = res.data.prices;

    return {
      body: JSON.stringify({
        data: data.map((flight: Flight, i: number) => ({
          id: i,
          origin: flight.origin,
          destination: flight.destination,
          depart_date: flight.depart_date,
          arrival_date: new Date(
            new Date(flight.depart_date).getTime() + flight.duration * 60000
          ).toISOString(),
          duration: flight.duration,
          price: flight.price,
        })),
      }),
      statusCode: 200,
    };
  } catch (e) {
    return {
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(e),
      statusCode: 400,
    };
  }
};

module.exports = { getFlights };
