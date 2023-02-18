import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from './../../services/car.service';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  colors:Color[];
  brands:Brand[];
  lengthCar:number;
  carsFilter:Car[]
  currentCar:Car;
  brandIdFilter:number;
  colorIdFilter:number;

  constructor(private carService:CarService, private colorService:ColorService,private brandService:BrandService
    ,private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandIdAndColorId(params["colorId"],params["brandId"]);
      }
      else{
        
      }
    })
    this.getBrands();
    this.getColors();
    
      
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.carsFilter = response.data
      
      
    })
  }


  getColors(){
    this.colorService.getColor().subscribe(response=>{
      this.colors=response.data;
    })
  }

  selectedColor(colorId:any){
    if(this.colorIdFilter==colorId){
      return true;
    }
    else{
      return false;
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
    
  }

  selectedBrand(brandId:any){
    if(this.brandIdFilter==brandId){
      return true;
    }
    else{
      return false;
    }
  }
  getCarsByBrandIdAndColorId(colorId:number,brandId:number){
    this.carService.getCarsByBrandIdAndColorId(colorId,brandId).subscribe(response=>{
      this.carsFilter = response.data
      this.setLengthCar()
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
  
  setLengthCar(){
    this.lengthCar = this.carsFilter.length
  }


}
