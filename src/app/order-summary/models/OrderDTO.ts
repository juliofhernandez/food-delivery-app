import {FoodItem} from '@app/shared/model/FoodItem';
import {Restaurant} from '@app/shared/model/Restaurant';

export interface OrderDTO{
  foodItemList: FoodItem[];
  userId?: number;
  restaurant?: Restaurant;
}
