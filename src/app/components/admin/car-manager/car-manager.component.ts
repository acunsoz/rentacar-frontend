import { CarUpdateComponent } from './../car-update/car-update.component';
import { CarDeleteComponent } from './../car-delete/car-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { CarDetailService } from './../../../services/car-detail.service';
import { CarDetail } from './../../../models/carDetail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-manager',
  templateUrl: './car-manager.component.html',
  styleUrls: ['./car-manager.component.css']
})
export class CarManagerComponent implements OnInit {

  cars:CarDetail[];

  constructor(private carDetailService: CarDetailService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCars();
  }

  getImagePath(imagePath: string) {
    return this.carDetailService.getImagePath(imagePath);
  }


  getCars() {
    this.carDetailService.getCarDetails().subscribe(response => {
      this.cars = response.data;
    })
  }

  showCarUpdateModal(car: CarDetail) {
    const carUpdateModal = this.dialog.open(CarUpdateComponent, {
      disableClose: true,
      width: "40%"
    });
    carUpdateModal.componentInstance.currentCar = car;

    carUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showCarDeleteModal(car: CarDetail) {
    const carDeleteModal = this.dialog.open(CarDeleteComponent, {
      disableClose: true,
      width: "25%"
    });
    carDeleteModal.componentInstance.deletedCar = car;

    carDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

}
