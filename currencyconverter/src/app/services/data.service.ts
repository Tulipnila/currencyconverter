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
    return this.http.get(`https://openexchangerates.org/api/latest.json?app_id=0f232d07cc7346d999cc68767e4a59bd&base=${baseCurrency}`);
  }
  getHistory(date:string){
    return this.http.get(`https://openexchangerates.org/api/historical/${date}.json?app_id=0f232d07cc7346d999cc68767e4a59bd`)
  }
}
