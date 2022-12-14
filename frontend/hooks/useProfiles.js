import { useMemo } from "react";
import { useAccount } from "wagmi";
import { gql, useQuery } from "@apollo/client";

const PROFILES_QUERY = gql`
  query ($address: EthereumAddress!) {
    profiles(request: { ownedBy: [$address], limit: 5 }) {
      items {
        id
        isDefault
        handle
        name
        bio
        onChainIdentity {
          worldcoin {
            isHuman
          }
        }
        picture {
          __typename
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
        }
        coverPicture {
          __typename
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
        }
        attributes {
          key
          traitType
          value
        }
      }
    }
  }
`;

const useProfiles = () => {
  const { address } = useAccount();

  const { data, loading, error } = useQuery(PROFILES_QUERY, {
    variables: { address: address },
    skip: !address,
  });

  const profiles = useMemo(() => {
    if (!data) return;

    return data?.profiles?.items;
  }, [data]);

  return { profiles, loading, error };
};

export default useProfiles;
