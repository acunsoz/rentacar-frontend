import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brands:Brand[];
  colors:Color[];

  carAddForm:FormGroup
  constructor(private formBuilder:FormBuilder,private brandService:BrandService,
    private colorService:ColorService,private carService:CarService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]

    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data;
    });
  }

  getColors(){
    this.colorService.getColor().subscribe((response)=>{
      this.colors = response.data;
    })
  }


  add(){
    if(this.carAddForm.valid){
      let carModel =Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
            
          }
        }
      })
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    
  }

}
