import { CarManagerComponent } from './../car-manager/car-manager.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CarDetail } from './../../../models/carDetail';
import { CarDetailService } from './../../../services/car-detail.service';
import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../../services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Color } from './../../../models/color';
import { Brand } from './../../../models/brand';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  brands: Brand[];
  colors: Color[];

  currentCar:CarDetail
  car:CarDetail[]

  constructor(private formBuilder: FormBuilder, private brandService: BrandService,
    private carUpdateModal: MatDialogRef<CarUpdateComponent>,
    private colorService: ColorService, private carService: CarService,
    private carDetailService:CarDetailService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    
    console.log(this.currentCar.carId)

    this.getCarById(this.currentCar.carId);
    this.getBrands();
    this.getColours();
    this.createCarUpdateForm(); 
    
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.currentCar.carId],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColours() {
    this.colorService.getColor().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getCarById(carId: number) {
    this.carDetailService.getCarById(carId).subscribe((response) => {
      this.car= response.data;
      this.carUpdateForm.controls['brandId'].setValue(this.car[0].brandId);
      this.carUpdateForm.controls['colorId'].setValue(this.car[0].colorId);
      this.carUpdateForm.controls['modelYear'].setValue(this.car[0].modelYear);
      this.carUpdateForm.controls['dailyPrice'].setValue(this.car[0].dailyPrice);
      this.carUpdateForm.controls['description'].setValue(this.car[0].description);
    });
  }

  update(){
    if(this.carUpdateForm.valid){
      let newCar = Object.assign({}, this.carUpdateForm.value);
      newCar.carId = this.currentCar.carId;
      console.log(newCar)
      this.carService.update(newCar).subscribe(()=>{
        this.toastrService.success( "Araba güncellendi", "Güncelleme başarılı");
        this.closeCarUpdateModal();
      },responseError => {
        if(responseError.error.Errors.length>0)
        {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      })
    }
    else{
      this.toastrService.error("Formunuz eksik", "Dikkat");
      this.carUpdateForm.reset();
    }
    
  }

  closeCarUpdateModal() {
    this.carUpdateModal.close();
  }

}
