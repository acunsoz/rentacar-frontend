import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = [];
  currentCar:Car;
  dataLoaded = false;
  filterText="";

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      console.log(params)
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandIdAndColorId(params["colorId"],params["brandId"]);
      }
      else{
        this.getCars(); 
      }
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
      
      this.dataLoaded = true;
    })
  }
  getCarsByBrandIdAndColorId(colorId:number,brandId:number){
    this.carService.getCarsByBrandIdAndColorId(colorId,brandId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded=true;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }

  setCurrentCar(car:Car){
    this.currentCar = car;
  }

  getCurrentCarClass(car:Car){
    if(car==this.currentCar){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

}
