export interface Experience {
  _id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  shortDesc: string;
}

export interface Slot {
  date: string;
  time: string;
  available: boolean;
}

export interface Booking {
  name: string;
  email: string;
  experienceId: string;
  slotId: string;
  promoCode?: string;
}
