
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }



  getCities() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    return this
      .http
      .get(this.uri+"/cities", httpOptions);
  }
  auth() {
    this.http.get(this.uri+ '/token/sign')
      .subscribe(
        (res) => {
          console.log(res);
          if (res['token']) {
            localStorage.setItem('token', res['token']);
            console.log(localStorage.getItem('token'));
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

 
}
