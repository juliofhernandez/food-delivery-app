import {API_URL_ORDER} from '@app/constants/url';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })

export class OrderService {
  private apiUrl = API_URL_ORDER+"/order/saveOrder";

  constructor(private http: HttpClient) {}

  httOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    })
  }

  saveOrder(data:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,data).pipe(catchError(this.handleError));
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
