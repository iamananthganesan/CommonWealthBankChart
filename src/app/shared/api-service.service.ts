import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  private http_url = "assets/data.json";

  getService():Observable<any>{
    return this.http.get(this.http_url);
  }
}
