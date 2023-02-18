import { CarDetail } from './../../../models/carDetail';
import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../../services/car.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

  deletedCar: CarDetail;

  constructor(private carDeleteModal: MatDialogRef<CarDeleteComponent>,private carService: CarService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  delete(car: CarDetail) {
    this.carService.delete(car).subscribe(response => {
      this.toastrService.success(car.brandName + " " + car.description + " aracı silindi", "Silme işlemi başarılı");
      this.closeCarDeleteModal();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız");
    })
  }

  closeCarDeleteModal() {
    this.carDeleteModal.close();
  }

}
