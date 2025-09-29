import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestaurantListingComponent} from './components/restaurant-listing.component';

const routes: Routes = [
  /*
  The path '' is the default path for the restaurant listing module. => It will load the RestaurantListingComponent when the module is accessed.

  The component is the main component that will be displayed when the user navigates to the restaurant listing page.
  This is the entry point for the restaurant listing feature of the application.
   */
  {
    path: '', component: RestaurantListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantListingRoutingModule { }
