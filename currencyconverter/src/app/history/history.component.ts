import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input() selectedCurrency: string = '';
  date:string = new Date().toISOString().split('T')[0];

  public data:any;
  chart:any;

  constructor(public service:DataService){
  }
  ngOnInit(): void {
    const currentDate = new Date();
    this.date = this.getSelectedDate(currentDate);

    this.service.getHistory(this.date).subscribe((res: any) => {
      console.log('response from gethistory',res);
      this.data = res;
      this.createChart();
    });
    

  }
  getSelectedDate(date: Date):string{
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');

    return `${year}-${month}-${day}`;

  }
 
  createChart() {
    if (!this.data || !this.data.rates && this.selectedCurrency) {
      console.log("Data or rates not available.");
      return; // Data is not available yet, so don't create the chart
    }
   
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (this.chart) {
        this.chart.destroy();
    }
    const rates = this.data.rates; 
    const labels = Object.keys(rates).filter(currency => currency !== this.selectedCurrency);
    const values = Object.values(rates).filter(currency => currency !== rates[this.selectedCurrency]);

    const label = `Exchange Rate for 1$ ${this.selectedCurrency} - ${this.date}`;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderColor: 'rgba(75, 192, 192, 1)', 
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive:true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}
}