import { Iauction } from "@features/auctions/types";

export interface Imarker {
  lat: number;
  lng: number;
  auction: Iauction;
}
