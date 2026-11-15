interface formobj {
  emailid: string,
  name: string,
  contact: string,
  business: string,
  area: string,
  address: string,
  city: string,
  estd: string,
  website: string,
  insta: string,
  shoppic: File | null,
  certpic: File | null,
  shopicurl?: string,
  certpicurl?: string,

}
export type {formobj};