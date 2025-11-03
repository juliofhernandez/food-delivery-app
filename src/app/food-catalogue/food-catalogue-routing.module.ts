import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestaurantListingComponent} from '@app/restaurant-listing/components/restaurant-listing.component';
import {FoodCatalogueComponent} from '@app/food-catalogue/components/food-catalogue.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodCatalogueRoutingModule { }
