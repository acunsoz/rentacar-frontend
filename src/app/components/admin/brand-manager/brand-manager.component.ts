import { BrandUpdateComponent } from './../brand-update/brand-update.component';
import { BrandDeleteComponent } from './../brand-delete/brand-delete.component';
import { BrandService } from './../../../services/brand.service';
import { Brand } from './../../../models/brand';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-manager',
  templateUrl: './brand-manager.component.html',
  styleUrls: ['./brand-manager.component.css']
})
export class BrandManagerComponent implements OnInit {

  brands: Brand[];
  constructor(private brandService:BrandService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data
    })
  }

  showBrandUpdateModal(brand: Brand) {
    const brandUpdateModal = this.dialog.open(BrandUpdateComponent, {
      disableClose: true,
      width: "30%"
    });
    brandUpdateModal.componentInstance.currentBrand = brand;

    brandUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showBrandDeleteModal(brand: Brand) {
    const brandDeleteModal = this.dialog.open(BrandDeleteComponent, {
      disableClose: true,
      width: "25%"
    });
    brandDeleteModal.componentInstance.deletedBrand = brand;

    brandDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }


}
