import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getCurrencies(){
    return this.http.get(`https://openexchangerates.org/api/currencies.json`);
  }
  getData(baseCurrency:string){
    return this.http.get(`https://openexchangerates.org/api/latest.json?app_id=ac3d5deac1cd46fd8cfd4273a845884d&base=${baseCurrency}`);
  }
  getHistory(date:string){
    return this.http.get(`https://openexchangerates.org/api/historical/${date}.json?app_id=ac3d5deac1cd46fd8cfd4273a845884d`)
  }
}
