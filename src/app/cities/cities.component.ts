import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import City from '../City';
import { CityService } from '../city.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; 
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  math = Math;
  cities: City[];
  displayedColumns: string[] = ['rank','cityname', 'qaindex','country','isocode' ,'population'];

  dataSource = new MatTableDataSource<object>(this.cities);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private cs: CityService, private changeDetectorRefs: ChangeDetectorRef, private _bottomSheet: MatBottomSheet) { }
  openBottomSheet(): void {
    this._bottomSheet.open(InfoSheet);
  }
  ngOnInit() {
 
    this.getCities();
  
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
 
  //Highlight aqindex background depending on values intervals. 
  getBackground(x: number) {

    switch (true) {
      case (x <= 50):
        return "#009966"
        break;
      case (x > 50 && x <=100):
        return "#ffde33"
        break;
      case (x > 100 && x <= 150):
        return "#ff9933"
        break;
      case (x > 150 && x <= 200):
        return "#cc0033"
        break;
      case (x > 200 && x <=300):
        return "#660099"
        break;
      case (x >300):
        return "#7e0023"
        break;
      default:
      
        break;
    }
  }
  //Format population number
  numberWithCommas(x:number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getCities() {
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
            
              const idfilter = filter.id;

              const val = data[filter.id] === null ? '' : data[filter.id];
              matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
            });
            return matchFilter.every(Boolean);
          };
      
   
        this.changeDetectorRefs.detectChanges();
      });
  }

}

@Component({
  selector: 'infosheet',
  templateUrl: 'infosheet.html',
})
export class InfoSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<InfoSheet>) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
