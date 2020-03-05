import { Component } from '@angular/core';
import { CityService } from './city.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'worldairpollution';
  constructor(private cs: CityService) {
    this.cs
    .auth();}

  ngOnInit() {

   

  }
}
