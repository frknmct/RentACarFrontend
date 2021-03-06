import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  currentCar:Car;
  dataLoaded=false;
  filterText="";
  constructor(private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private activatedRoot:ActivatedRoute) {}

  ngOnInit(): void {

    this.activatedRoot.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else{
        this.getCars();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  setCurrentCar(car:Car){
    this.currentCar=car;
  }

  getCurrentCarClass(car:Car){
    if(car==this.currentCar){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }
  

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }
}
