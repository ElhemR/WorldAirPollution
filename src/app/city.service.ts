
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  uri = 'http://localhost:4000/City';

  constructor(private http: HttpClient) { }



  getCities() {
    return this
      .http
      .get(`${this.uri}`);
  }

 
}
