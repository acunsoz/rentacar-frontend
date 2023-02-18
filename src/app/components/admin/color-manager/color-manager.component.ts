import { ColorUpdateComponent } from './../color-update/color-update.component';
import { ColorDeleteComponent } from './../color-delete/color-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from './../../../services/color.service';
import { Color } from './../../../models/color';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-manager',
  templateUrl: './color-manager.component.html',
  styleUrls: ['./color-manager.component.css']
})
export class ColorManagerComponent implements OnInit {

  colors: Color[];

  constructor(private colorService:ColorService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColor().subscribe(response => {
      this.colors = response.data;
    })
  }

  showColorUpdateModal(color: Color) {
    const colorUpdateModal = this.dialog.open(ColorUpdateComponent, {
      disableClose: true,
      width: "30%"
    });
    colorUpdateModal.componentInstance.currentColor = color;

    colorUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showColorDeleteModal(color: Color) {
    const colorDeleteModal = this.dialog.open(ColorDeleteComponent, {
      disableClose: true,
      width: "25%"
    });
    colorDeleteModal.componentInstance.deletedColor = color;

    colorDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

}
