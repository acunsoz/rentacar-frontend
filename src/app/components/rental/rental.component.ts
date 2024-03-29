import { CarService } from './../../services/car.service';
import { RentalService } from './../../services/rental.service';
import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:Rental[]  = []
  dataLoaded = false;

  constructor(private rentalService:RentalService,private carService:CarService) { }

  ngOnInit(): void {
    this.getRentals()
    
  }

  getRentals(){
    this.rentalService.getRentals().subscribe((response)=>{
      this.rentals = response.data
      this.dataLoaded = true;
    });
  }

 
}
