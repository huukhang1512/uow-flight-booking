import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { airportsList } from "./airPortData/data";

export const getAirports = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const query = event["queryStringParameters"];
  const searchQuery = query?.searchQuery?.toLowerCase() || "";
  const filteredAirport = airportsList.filter(
    (airport) =>
      airport.city.name.toLowerCase().includes(searchQuery) ||
      airport.name.toLowerCase().includes(searchQuery) ||
      airport.name.toLowerCase().includes(searchQuery) ||
      airport.city.country.countryName.toLowerCase().includes(searchQuery)
  );
  return {
    body: JSON.stringify(filteredAirport),
    statusCode: 200,
  };
};

export const getAirportById = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const params = event["pathParameters"];
  const id = params?.id;
  return {
    body: JSON.stringify(
      airportsList.find((airport) => airport.id === parseInt(id || "")) ??
        `Cannot found matching airport match ${id}`
    ),
    statusCode: 200,
  };
};

module.exports = { getAirports, getAirportById };
