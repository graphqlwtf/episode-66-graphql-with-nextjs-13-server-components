import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  process.env.GRAFBASE_API_URL as string,
  {
    headers: {
      "x-api-key": process.env.GRAFBASE_API_KEY as string,
    },
  }
);
