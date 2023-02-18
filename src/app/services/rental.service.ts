import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponeModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44337/api/rentals/"
  rentalData?:Rental;

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "getrentaldetails" 
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  AddRental(rentalJson:any):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ListResponseModel<Rental>>(newPath,rentalJson).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
