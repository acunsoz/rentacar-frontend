import { CarImage } from "./carImage";

export interface CarDetail{
    carId:number;
    carName:string;
    brandName:string;
    colorName:string;
    modelYear:string;
    brandId:number;
    colorId:number;
    dailyPrice:number;
    description:string;
    carImage:CarImage[];
}