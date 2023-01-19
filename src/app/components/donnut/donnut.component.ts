import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-donnut',
  templateUrl: './donnut.component.html',
  styleUrls: ['./donnut.component.css']
})
export class DonnutComponent  implements OnChanges{


    @Input('title') title: string = '';
    @Input('labels') doughnutChartLabels: string[] = [];
    @Input('data')  data : any;

    doughnutChartData: ChartData<'doughnut'> = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [ 350, 450, 100 ] },
        { data: [ 50, 150, 120 ] },
        { data: [ 250, 130, 70 ] },
      ]
    };

    ngOnChanges(changes: SimpleChanges): void {
      this.doughnutChartData.datasets = this.data;
      this.doughnutChartData.labels = this.doughnutChartLabels;
    }

    public doughnutChartType: ChartType = 'doughnut';

    // events
    public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
      console.log(event, active);
    }

    public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
      console.log(event, active);
    }


}
