export interface Restaurant {
  // The ? indicates that these properties are optional
  id: number;
  name?: string;
  address?: string;
  city?: string;
  restaurantDescription?: string;
}
