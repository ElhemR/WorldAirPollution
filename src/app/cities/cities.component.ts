import { Component, OnInit, ViewChild } from '@angular/core';
import City from '../City';
import { CityService } from '../city.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; 

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {


  cities: City[];
  displayedColumns: string[] = ['country', 'cityname', 'qaindex'];

  dataSource = new MatTableDataSource<object>(this.cities);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private cs: CityService) { }

  ngOnInit() {
    this.cs
      .getCities()
      .subscribe((data: City[]) => {
        this.cities = data;
        this.dataSource = new MatTableDataSource<object>(this.cities);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate =
          (data, filtersJson: string) => {
            const matchFilter = [];
            const filters = JSON.parse(filtersJson);

            filters.forEach(filter => {
              const val = data[filter.id] === null ? '' : data[filter.id];
              matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
            });
            return matchFilter.every(Boolean);
          };
        console.log(this.cities);
      });
  }
  //Filter on Country Name
  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'cityname',
      value: filterValue
    });


    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
