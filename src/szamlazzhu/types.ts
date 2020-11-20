
export interface PostAddress {
  name: string;
  zip: string;
  city: string;
  address: string;
}

export interface Buyer {
  name: string;
  email: string;
  sendEmail: boolean;
  country: string;
  zip: string;
  city: string;
  taxNumber?: string;
  address: string;
  postAddress: PostAddress;
  identifier: number;
  phone: string;
  issuerName: string;
}
