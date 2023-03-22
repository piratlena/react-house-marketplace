export interface IListing {
  name: string;
  type: string;
  userRef: string;
  bedrooms: string;
  bathrooms: string;
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  regularPrice: string;
  discountedPrice: string;
  location: string;
  latitude: number;
  longitude: number;
  imgUrls: [];
  timestamp: ITimestamp;
}

export interface ITimestamp {
  seconds: number;
  nanoseconds: number;
}
