import { CarImage } from './../../models/carImage';
import { ActivatedRoute } from '@angular/router';
import { CarDetailService } from '../../services/car-detail.service';
import { CarDetail } from '../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
//import { CarImage } from 'src/app/models/carImage';

@Component({
  selector: 'app-carr-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [DatePipe]
})
export class CarDetailComponent implements OnInit {
  
  
  carDetails:CarDetail[] = []
  carImages:CarImage[]=[];
  currentImages:CarImage;
  currentCar:CarDetail;
  sayi:number =0
  
  //kiralama ile alakalı
  firstDateSelected: boolean = false;
  rentDate: Date;
  returnDate : Date;
  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;


  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute
    ,private toastrService:ToastrService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCar(params["carId"])
        //this.getCarImages(params["carId"])
      }
    })
    
    
  }

  getCarDetails(){
    this.carDetailService.getCarDetails().subscribe((response)=>{
      this.carDetails = response.data
    })
  }

  getCarDetailsByCar(carId:number){
    this.carDetailService.getCarDetailsByCar(carId).subscribe((response)=>{
      this.carDetails = response.data,
      this.carImages = this.carDetails[0].carImage;
      
      
    })
  }

  getPath(){
    
    return (this.carDetailService.getPath())  
    
 }

  getButtonClass(image: CarImage) {
      if ((image == this.currentImages) ) {
        return 'active';
      } else {
        return '';
      }
    
    
  }

  
  getCurrentImageClass(image: CarImage) {
      if(this.currentImages==undefined){
      image =this.carImages[0]
      return 'carousel-item active';
      }
      else if((image == this.currentImages))
       {
       return 'carousel-item active';
       } else {
       return 'carousel-item ';
       }
  }

  setImageButton(image:CarImage){
      this.currentImages = image
      this.getCurrentImageClass(this.currentImages)
  }

  setCurrentCar(car:CarDetail){
    this.currentCar = car;
  }

  // burdan sonrası araba kiralama ile ilgili
  
  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }
  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }
  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }


  
}
  
