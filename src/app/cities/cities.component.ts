import { Component, OnInit } from '@angular/core';
import City from '../City';
import { CityService } from '../city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {


  cities: City[];

  constructor(private cs: CityService) { }

  ngOnInit() {
    this.cs
      .getCities()
      .subscribe((data: City[]) => {
        this.cities = data;
        console.log(this.cities);
      });
  }

}
