import { NFTDataContext } from "@zoralabs/nft-components";
import { NFTFetchContext } from "@zoralabs/nft-hooks/dist/context/NFTFetchContext";
import {
  addAuctionInformation,
  auctionDataToPricing,
} from "@zoralabs/nft-hooks/dist/fetcher/TransformFetchResults";
import { ReactNode, useContext } from "react";
import useSWR from "swr";
import { transformToken } from "./transformToken";

export const DataProvider = ({
  initialData,
  tokenId,
  children,
  refreshInterval,
}: {
  refreshInterval?: number;
  initialData: any;
  tokenId: number;
  children: ReactNode;
}) => {
  const fetcher = useContext(NFTFetchContext);
  const contractAddress = process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS;
  const mediaData = initialData;

  const auctionData = useSWR(
    tokenId ? ["loadAuctionForNFT", contractAddress, tokenId] : null,
    (_, contractAddress, tokenId) =>
      fetcher.loadAuctionInfo(contractAddress, tokenId),
    {
      refreshInterval,
    }
  );

  const currencyData = useSWR(
    auctionData.data
      ? ["loadCurrencies", auctionData.data?.auctionCurrency]
      : null,
    (_, ...currencies) => fetcher.loadCurrencies(currencies)
  );

  const transformedToken = transformToken(mediaData);
  if (transformedToken.nft.data) {
    transformedToken.nft.data.pricing = addAuctionInformation(
      { reserve: auctionDataToPricing(auctionData?.data) },
      currencyData.data
    );
  }

  return (
    <NFTDataContext.Provider value={transformedToken}>
      {children}
    </NFTDataContext.Provider>
  );
};
