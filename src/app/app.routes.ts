 import { Routes } from '@angular/router';

export const routes: Routes = [
  /*
  El path '' is the default path for the application. => It will load the RestaurantListingModule when the application starts.

  pathMatch: 'full' ensures that the empty path matches exactly, preventing any partial matches that could lead to unexpected behavior.
  This is important for the initial load of the application.

  The loadChildren syntax is used for lazy loading the module, which means the module will only be loaded when the application starts.
  Lazy loading helps in reducing the initial load time of the application by splitting the application into smaller chunks that can be loaded on demand.
  This is a common practice in Angular applications to improve performance.
   */
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./restaurant-listing/restaurant-listing.module').then(m => m.RestaurantListingModule)
  }
];
