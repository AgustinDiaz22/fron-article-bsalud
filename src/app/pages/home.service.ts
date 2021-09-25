import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { BehaviorSubject, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public _http: HttpClient,
  ) { }

  public allArticles() {
    const URL = 'http://localhost:300/api/all';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this._http.get(URL, {
      headers: headers
    }).pipe(
      map(res => {
        return res;
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }
  public deleteMovement(article) {
    const URL = 'http://localhost:300/api/deleteMovement';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

    const params = new HttpParams()
      .set('_id', article._id)
      
    return this._http.delete(URL + `/${article._id}`, {
      headers: headers,
      params: params
    }).pipe(
      map(res => {
        return res;
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }
  public allMovement() {
    const URL = 'http://localhost:300/api/allMovement';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this._http.get(URL, {
      headers: headers
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
