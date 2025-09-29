import {FoodItem} from '@app/shared/model/FoodItem';
import {Restaurant} from '@app/shared/model/Restaurant';

export interface FoodCataloguePage {
  foodItemList: FoodItem[];
  restaurantDTO: Restaurant | null;
}
