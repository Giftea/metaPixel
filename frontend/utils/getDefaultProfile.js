import { DEFAULT_PROFILE } from "../api"
import { client } from "../apollo-client";
import { gql } from "@apollo/client";


export async function getDefaultProfile(address){
    console.log("HERE")
    const result = await client.query({
        query: gql(DEFAULT_PROFILE),
        variables: {
            request: {ethereumAddress: address},
        },
      });
    console.log('profiles: result', result);
  
    return result;
  };