import { ToastrService } from 'ngx-toastr';
import { CarDetailService } from './../../services/car-detail.service';
import { CarDetail } from './../../models/carDetail';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from './../../services/rental.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl,Validators} from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  rentalData:any;
  rentalJson:any;
  rentalCar:any;
  paymentForm:FormGroup
  carDetails:CarDetail[]=[]
  returnDate:any
  rentDate:any
  total:number
  days:number
  month:number
  rentalTrue:boolean=false

  constructor(private rentalService:RentalService,private activatedRoute:ActivatedRoute
    ,private formBuilder:FormBuilder,private router:Router,private carDetailService:CarDetailService
    ,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(parseInt(params["carId"])){
        this.getCarDetailsId(parseInt(params["carId"]))
      }
      this.rentDate=params["rentDate"]
      this.returnDate=params["returnDate"]
    })
    this.createPaymentAddForm()
    console.log(this.paymentForm)
    
    
  }

  getCarDetailsId(carId:number){
    this.carDetailService.getCarDetailsId(carId).subscribe((response)=>{
      this.carDetails = response.data
      this.dailyPriceTotal()
    })
  }

  addRental(){
    var payments = this.paymentForm.value
    
      this.rentalJson = this.activatedRoute.params.subscribe(params=>{
        const carRent={
        "CarId":parseInt(params["carId"]),
        "CustomerId":4,
        "RentDate":params["rentDate"],
        "ReturnDate":params["returnDate"]
        }
        this.rentalCar=carRent
    })
    if(payments.cardNumber.length==16 && (payments.expMonth>0 && payments.expMonth<=12) && payments.expYear>22){
    this.rentalService.AddRental(this.rentalCar).
    subscribe(response=>{
      this.toastrService.success("Araba Kiralandı");
      sessionStorage.removeItem('rentalCar');
      setTimeout(() => {  this.toastrService.success("Anasayfaya Yönlendiriliyorsun"); }, 3000);
      this.rentalTrue=true
    },(error)=>{
      this.toastrService.error("Üzgünüz Araba Kirada. Başka Araba bulman için");
      setTimeout(() => {this.toastrService.success("Anasayfaya Yönlendiriliyorsun"); }, 2000);
      setTimeout(() => {  this.toastrService.success("İyi günler :)"); }, 3000);
      this.rentalTrue=true
    })}
    else{
      this.toastrService.warning("Bilgilerden biri hatalı olabilir kontrol edin");
    }
    console.log(payments.cardNumber.length+" "+payments.expMonth+" "+payments.expYear)
    
    
  }

  createPaymentAddForm() {
    this.paymentForm = this.formBuilder.group({
     //customerId: [this.rental.customerId, Validators.required],
     fullName:[(''), Validators.required,],
     cardNumber:[(''), Validators.required],
     expMonth:[(''), Validators.required],
     expYear:[(''), Validators.required],
     cvv: [(''), Validators.required]
   });
   
 }
 
 dailyPriceTotal(){
  //console.log(typeof this.returnDate.split("-")[2])
  if(parseInt(this.returnDate.split("-")[1])==parseInt(this.rentDate.split("-")[1])){
    this.days = parseInt(this.returnDate.split("-")[2])-parseInt(this.rentDate.split("-")[2])
    this.total = this.carDetails[0].dailyPrice*this.days
  }
  else if(parseInt(this.returnDate.split("-")[1])!=parseInt(this.rentDate.split("-")[1])){
    this.month = ((parseInt(this.returnDate.split("-")[1])-parseInt(this.rentDate.split("-")[1]))-2)*30
    this.days = (parseInt(this.returnDate.split("-")[2])+(30-parseInt(this.rentDate.split("-")[2])))
    this.total = (this.month+this.days)*this.carDetails[0].dailyPrice
  }
 }

 onSubmit(){
   //console.warn(this.paymentForm.value)
 }

 
}
