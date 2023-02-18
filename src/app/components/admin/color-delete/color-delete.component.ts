import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../../services/color.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Color } from './../../../models/color';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent implements OnInit {

  deletedColor: Color;

  constructor(private deleteColorModal: MatDialogRef<ColorDeleteComponent>,
    private colorService: ColorService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  delete(color: Color) {
    this.colorService.delete(color).subscribe(response => {
      this.toastrService.success(color.name + " rengi silindi", "Silme işlemi başarılı")
      this.closeColorDeleteModal();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız")
    })
  }

  closeColorDeleteModal() {
    this.deleteColorModal.close();
  }

}
