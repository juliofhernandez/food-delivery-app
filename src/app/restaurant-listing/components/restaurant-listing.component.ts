import { Component } from '@angular/core';
import {Restaurant} from '@app/shared/model/Restaurant';
import {RestaurantService} from '@app/restaurant-listing/service/restaurant.service';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';

type RestaurantWithImg = Restaurant & { imageSrc: string };

@Component({
  selector: 'app-restaurant-listing',
  imports: [
    NgForOf
  ],
  templateUrl: './restaurant-listing.component.html',
  styleUrl: './restaurant-listing.component.css'
})
export class RestaurantListingComponent {

  public restaurantList: RestaurantWithImg[];
  private readonly basePath = '/assets/restaurant-pics/';

  // This is the trackBy function for the ngFor directive
  // It will help Angular to track the items in the list by their id, This will improve the performance of the application\
  trackById = (_: number, r: Restaurant) => r.id;

  /**
   * This is the constructor of the RestaurantListingComponent
   * It will inject the Router and RestaurantService services
   * @param router - The router service to navigate to different pages
   * @param restaurantService - The restaurant service to get all the restaurants from the server
   */
  constructor(private router:Router, private restaurantService: RestaurantService) {
  }

  /**
   * This method is called when the component is initialized
   * It will call the getAllRestaurants method to get all the restaurants from the server
   */
  ngOnInit() {
    // Fetch all restaurants from the service
    this.getAllRestaurants();
  }

  /**
   * This method is called when the user clicks on the button
   * It will navigate to the restaurant page with the id of the restaurant
   * @param id - The id of the restaurant
   */
  onButtonClick(id: number) {
    this.router.navigate(['/food-catalogue',id])
  }

  /**
   * This method is called to get all the restaurants from the server
   * It will call the restaurant service to get all the restaurants
   */
  private getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurantList = data.map((r:Restaurant) => ({
          ...r,
          imageSrc: `${this.basePath}${r.id}.jpg` // Construct the image source path
        }));
        console.info(this.restaurantList); // Log the data to the console for debugging purposes
      }
    )
  }

  onImgError(ev: Event) {
    // This method is called when the image fails to load
    const img = ev.target as HTMLImageElement;
    img.src = `${this.basePath}placeholder.jpg`;
  }
}
