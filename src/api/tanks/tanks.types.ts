export interface Image {
  small_icon: string;
  contour_icon: string;
  big_icon: string;
}

export interface Tank {
  tank_id: number;
  name: string;
  description: string;
  images: Image;
  price_gold: number;
  tier: number;
  nation: string;
  type: string;
  short_name: string;
}
