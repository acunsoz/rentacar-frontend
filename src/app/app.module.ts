import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';

import { ToastrModule } from 'ngx-toastr';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ManagerComponent } from './components/admin/manager/manager.component';
import { BrandManagerComponent } from './components/admin/brand-manager/brand-manager.component';
import { BrandUpdateComponent } from './components/admin/brand-update/brand-update.component';
import { BrandDeleteComponent } from './components/admin/brand-delete/brand-delete.component';
import { ColorManagerComponent } from './components/admin/color-manager/color-manager.component';
import { ColorDeleteComponent } from './components/admin/color-delete/color-delete.component';
import { ColorUpdateComponent } from './components/admin/color-update/color-update.component';
import { CarManagerComponent } from './components/admin/car-manager/car-manager.component';
import { CarDeleteComponent } from './components/admin/car-delete/car-delete.component';
import { CarUpdateComponent } from './components/admin/car-update/car-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    FilterPipePipe,
    ColorFilterPipePipe,
    BrandFilterPipePipe,
    CarFilterComponent,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    ManagerComponent,
    BrandManagerComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    ColorManagerComponent,
    ColorDeleteComponent,
    ColorUpdateComponent,
    CarManagerComponent,
    CarDeleteComponent,
    CarUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
