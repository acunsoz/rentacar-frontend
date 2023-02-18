import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../../services/brand.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Brand } from './../../../models/brand';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  currentBrand: Brand;
  brandAddForm:FormGroup;
  brandUpdateForm: FormGroup;

  constructor(private brandService: BrandService,
    private toastrService: ToastrService,private updateModal: MatDialogRef<BrandUpdateComponent>,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let newBrand = Object.assign({}, this.brandUpdateForm.value);
      newBrand.id = this.currentBrand.id;
      
      if (newBrand.name == this.currentBrand.name) {
        this.toastrService.error("Marka adı eskisiyle aynı", "Güncelleme yapılmadı");
        return;
      }

      this.brandService.update(newBrand).subscribe(() => {
        this.toastrService.success(this.currentBrand.name + ", " + newBrand.name + " şeklinde güncellendi", "Güncelleme başarılı");
        this.closeUpdateModal();
      }, responseError => {
        if(responseError.error.Errors.length>0)
        {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      })

    } else {
      this.toastrService.error("Formunuz eksik", "Dikkat");
      this.brandUpdateForm.reset();
    }
  }

  closeUpdateModal() {
    this.updateModal.close();
  }
  
  
  createBrandForm(): FormGroup {
    return this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.createBrandForm();
  }
  

}
