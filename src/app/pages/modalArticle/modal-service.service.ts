import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(
    public _http: HttpClient,
  ) { }

  public savereason(article: any) {

    const URL = 'http://localhost:300/api/savereason';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this._http.post(URL, {
      headers: headers,
      body: article
    }).pipe(
      map(res => {
        return res;
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }
}
