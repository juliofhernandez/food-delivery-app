import {Injectable} from '@angular/core';
import {API_URL_RESTAURANT} from '@app/constants/url';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiURL = API_URL_RESTAURANT + '/restaurant/getAllRestaurants';
  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<any> {
    return this.http.get<any>(this.apiURL).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
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
