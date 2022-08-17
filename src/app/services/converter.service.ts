import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { IRates } from '../models/rates';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})

export class ConverterService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  getCurrencyToUah(base: string): Observable<IRates> {
    return this.http.get<IRates>(`https://api.exchangerate.host/latest?base=${base}&amount=1&symbols=UAH&places=2`)
    .pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  getExchangeRate(amount: number, to: string, from: string): Observable<IRates> {
    return this.http.get<IRates>(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}&amount=${amount}&places=2`)
    .pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handleError(error.message)
    return throwError(() => error.message)
  }
}
