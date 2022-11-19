import { DEFAULT_PROFILE } from "../lensCalls"
import { client } from "../apollo-client";
import { gql } from "@apollo/client";


export async function getDefaultProfile(address){
    const result = await client.query({
        query: gql(DEFAULT_PROFILE),
        variables: {
            request: {ethereumAddress: address},
        },
      });
    return result;
  };