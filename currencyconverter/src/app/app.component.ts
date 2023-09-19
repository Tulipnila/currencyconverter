import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'currencyconverter';
  
  currencyData: {[key:string]:string} | undefined;
  ratesData: { [key: string]: number } | undefined;

  baseCurrency = 'USD';

  selectedCurrency: string = '';

  constructor(public service:DataService){
    this.service.getCurrencies().subscribe((data:any) => {
      this.currencyData = data;

      if(this.currencyData){
        this.service.getData(this.baseCurrency).subscribe((res:any) => {
          this.ratesData = res.rates;
          
        })
       }
      
    })
  }
  handleCurrencyChanged(currency: string) {
    this.selectedCurrency = currency;
  }
}
