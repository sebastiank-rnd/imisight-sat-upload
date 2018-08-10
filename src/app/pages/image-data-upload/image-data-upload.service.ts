import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError, tap, map, last } from 'rxjs/operators';

import { IA3DataItem } from './IA3DataItem';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageDataUploadService {
  private baseUrl = `${environment.gatewayUrl}/a3`;

  constructor(private httpClient: HttpClient) {  }

  public save(imageData: FormData): Observable <HttpEvent<IA3DataItem>> {

    const req = new HttpRequest(
      'POST',
      this.baseUrl,
      imageData,
      {
        reportProgress: true,
      },
    );

    return this.httpClient.request(req);
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
