import { Component, Input, HostListener, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() currencies:{[key:string]:string} | undefined;
  @Input() rates: { [key: string]: number } | undefined;

  @Output() selectedCurrency = new EventEmitter<string>();

  inputAmount:number=0;
  convertedAmount:number=0;
  
  selectedFromCurrency:string = '';
  selectedToCurrency:string = '';

  showFromDropdown: boolean = false;
  showToDropdown:boolean = false;

  constructor(){}

  ngOnInit(): void {
    this.inputAmount=100;
    this.selectedFromCurrency = 'INR';
    this.selectedToCurrency = 'USD';
    this.convertCurrency();
  }
  toggleDropdown(type:string){
    if(type === 'from'){
      this.showFromDropdown = !this.showFromDropdown;
      this.showToDropdown = false;
    } else if ( type === 'to') {
      this.showToDropdown = !this.showToDropdown;
      this.showFromDropdown = false;
    }
  }

  selectCurrency(currency:string, type:string){
    if(type === 'from') {
      this.selectedFromCurrency = currency;
      this.selectedCurrency.emit(this.selectedFromCurrency);

      // this.showFromDropdown = false;
    } else if (type === 'to') {
      this.selectedToCurrency = currency;
      // this.showToDropdown = false;
    }
  }

  convertCurrency() {
    if (this.selectedFromCurrency && this.selectedToCurrency && this.rates) {
      const fromRate = this.rates[this.selectedFromCurrency];
      const toRate = this.rates[this.selectedToCurrency];
  
      if (fromRate !== undefined && toRate !== undefined) {
        this.convertedAmount = (this.inputAmount * toRate) / fromRate;
        // this.convertAmt = convertedAmount;
      console.log('check:',this.rates[this.selectedFromCurrency])

        console.log(`Converted Amount: ${this.convertedAmount}`);
      } else {
        console.error('Invalid currency rates');
      }
    } 

  
  }  
  @HostListener('document:click',['$event'])
  onClick(event:MouseEvent):void {
    const targetElement = event.target as HTMLElement;
    if(!targetElement.closest ('.custom-select')) {
      this.showFromDropdown = false;
      this.showToDropdown = false;
    }
  }
}
