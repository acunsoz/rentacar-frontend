import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponeModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44337/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarById(carId: number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "/cars/getcardetailsid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrandid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbycolorid?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandIdAndColorId(colorId:number,brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrandidandcolorid?colorId="+colorId+"&brandId="+brandId
    console.log(newPath)
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
    
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }
  delete(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/delete",car)
  }
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }

  

}
