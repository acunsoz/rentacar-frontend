import { CarManagerComponent } from './components/admin/car-manager/car-manager.component';
import { ColorManagerComponent } from './components/admin/color-manager/color-manager.component';
import { BrandManagerComponent } from './components/admin/brand-manager/brand-manager.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cardetails/car/:carId",component:CarDetailComponent},
  {path:"cars/filter/:brandId/c/:colorId",component:CarFilterComponent},
  {path:"cars/filter/:brandId/c",component:CarComponent},
  {path:"cars/filter/c/:colorId",component:CarComponent},
  {path:"cardetails/rental/:carId/:rentDate/:returnDate",component:PaymentComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"admin/car/manager/cars/add",component:CarAddComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"admin/brand/manager",component:BrandManagerComponent},
  {path:"admin/color/manager",component:ColorManagerComponent},
  {path:"admin/car/manager",component:CarManagerComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
