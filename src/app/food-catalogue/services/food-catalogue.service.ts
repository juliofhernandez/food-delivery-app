import { Injectable } from '@angular/core';
import {API_URL_FOODCATALOGUE} from '@app/constants/url';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodCatalogueService {

  private apiUrl = API_URL_FOODCATALOGUE + '/foodCatalogue/getFoodCatalogue/'

  constructor(private http:HttpClient) {}

  getFoodCatalogue(restaurantId: number):Observable<any> {
    //This method fetches the food catalogue for a specific restaurant
    return this.http.get(this.apiUrl + restaurantId).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    // Log the error to the console or send it to a logging infrastructure
    console.error('An error ocurred: '+ error);
    if (error instanceof HttpErrorResponse) {
      // Handle HTTP error
      return throwError(() => new Error(`HTTP error: ${error.status} - ${error.message}`));
    } else {
      // Handle non-HTTP error
      return throwError(() => new Error(`An unexpected error occurred: ${error.message}`));
    }
  }
}
