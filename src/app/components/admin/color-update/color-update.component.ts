import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Color } from './../../../models/color';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  currentColor: Color;
  colorUpdateForm: FormGroup

  constructor(private colorService: ColorService,
    private toastrService: ToastrService,private updateModal: MatDialogRef<ColorUpdateComponent>,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let newColor = Object.assign({}, this.colorUpdateForm.value);
      newColor.id = this.currentColor.id;

      if (newColor.name == this.currentColor.name) {
        this.toastrService.error("Renk adı eskisiyle aynı", "Güncelleme yapılmadı");
        return;
      }

      this.colorService.update(newColor).subscribe(() => {
        this.toastrService.success(this.currentColor.name + ", " + newColor.name + " şeklinde güncellendi", "Güncelleme başarılı");
        this.closeColorUpdateModal();
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
      this.colorUpdateForm.reset();
    }
  }

  closeColorUpdateModal() {
    this.updateModal.close();
  }
  
  
  createColorForm(): FormGroup {
    return this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.createColorForm();
  }
  


}
