import { IinRangeBody, ImapAuction } from "@features/auctions/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuctionsServices } from "utils/api";
import { Props } from "./map-search-options";

const useMapSearchOptions = ({ setAuctions }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const fetchAuctions = async () => {
      let sort;
      if (router.query.sort) {
        sort = JSON.parse(String(router.query.sort));
      }

      const body = { ...router.query, sort } as object as IinRangeBody;

      const auctions: ImapAuction[] = await AuctionsServices.getInRangeWithFilterAndSort(
        0,
        20,
        body
      );
      setAuctions(auctions);
    };

    fetchAuctions();
  }, [router.query]);

  return {};
};

export default useMapSearchOptions;
