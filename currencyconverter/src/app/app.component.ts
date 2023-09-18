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
      console.log('curr.data:',this.currencyData);
      console.log(typeof this.currencyData)

      if(this.currencyData){
        this.service.getData(this.baseCurrency).subscribe((res:any) => {
          console.log('res',res)
          this.ratesData = res.rates;
          console.log('ratesData:',this.ratesData);
          console.log(typeof this.ratesData)
        })
       }
      
    })
  }
  handleCurrencyChanged(currency: string) {
    this.selectedCurrency = currency;
    console.log('type:',typeof currency)
    console.log('From currency changed to:', currency);
  }
}
