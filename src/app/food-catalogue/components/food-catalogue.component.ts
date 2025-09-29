import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FoodCatalogueService} from '@app/food-catalogue/services/food-catalogue.service';
import {FoodCataloguePage} from '@app/shared/model/FoodCataloguePage';
import {FoodItem} from '@app/shared/model/FoodItem';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-food-catalogue',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './food-catalogue.component.html',
  styleUrl: './food-catalogue.component.css'
})
export class FoodCatalogueComponent {

  restaurantId: number;
  foodCatalogueResponse: FoodCataloguePage;
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage;


  constructor(private route:ActivatedRoute,private foodCatalogueService:FoodCatalogueService, private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = Number(params.get('id'));
    });
    console.log("Restaurant ID: ", this.restaurantId);
    this.getFoodCatalogueByRestaurantId(this.restaurantId);
  }

  getFoodCatalogueByRestaurantId(restaurantId: number) {
    this.foodCatalogueService.getFoodCatalogue(restaurantId).subscribe(
      data => {
        this.foodCatalogueResponse = data;
        console.log("foodCatalogueResponse: ", this.foodCatalogueResponse);
      }
    )
  }

  onCheckOut() {
    this.foodItemCart;
    this.orderSummary = {
      foodItemList: [],
      restaurantDTO : null
    }
    this.orderSummary.foodItemList = this.foodItemCart;
    this.orderSummary.restaurantDTO = this.foodCatalogueResponse.restaurantDTO;
    this.router.navigate(['/orderSummary'],{queryParams:{data: JSON.stringify(this.orderSummary)}});
  }

  increment(food:any){
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id == food.id);
    if(index === -1){
      // if item not found in cart, add it
      this.foodItemCart.push(food);
    }else {
      // if item found in cart, update its quantity
      this.foodItemCart[index] = food;
    }
  }

  decrement(food:any){
    if(food.quantity > 0){
      food.quantity--;

      const index = this.foodItemCart.findIndex(item => item.id == food.id);
      if(this.foodItemCart[index].quantity == 0){
        this.foodItemCart.splice(index, 1);
      } else {
        // if item found in cart, update its quantity
        this.foodItemCart[index] = food;
      }
    }
  }

}
