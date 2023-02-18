import { CarDetail } from './../models/carDetail';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponeModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl ="https://localhost:44337/api/"
  imageUrl = "https://localhost:44337/Uploads/Images/"

  constructor(private httpClient:HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "carimages/getimagecardetail";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarById(carId: number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetailsid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +"cars/getcardetailsid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByCar(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "carimages/getbyimagecarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getImagePath(imagePath: string) {
    return this.imageUrl + imagePath
  }

  getPath(){
    return this.imageUrl
  }


}
