import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IA3DataItem } from './IA3DataItem';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageDataUploadService {
  private baseUrl = `${environment.gatewayUrl}/a3`;

  constructor(private httpClient: HttpClient) {  }

  public save(imageData: FormData): Observable < IA3DataItem > {

    return this.httpClient.post < IA3DataItem > (this.baseUrl, imageData)
    .pipe(
      catchError(this._handleError)
    );
  }

  public fetch(): Observable < IA3DataItem[] > {
    return this.httpClient.get < IA3DataItem[] > (this.baseUrl)
    .pipe(
      catchError(this._handleError)
    );
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Unable to retrieve data';
    return throwError(errorMsg);
  }
}
