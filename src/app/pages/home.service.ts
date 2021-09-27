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
  public deletereason(article) {
    const URL = 'http://localhost:300/api/deletereason';
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
  public allreason(match: any = null) {
    const URL = 'http://localhost:300/api/allreason';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

    const params = new HttpParams()
      .set('match', JSON.stringify(match))
    return this._http.get(URL, {
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
}
