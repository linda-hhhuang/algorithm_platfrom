import { Component, OnInit } from '@angular/core';
import { MessageHandleService } from '../messagehandle.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-output-result',
  templateUrl: './output-result.component.html',
  styleUrls: ['./output-result.component.css']
})
export class OutputResultComponent implements OnInit {

  receiveMessage: any;
  showSuccess: boolean;
  chartOption1: EChartsOption;
  chartOption2: EChartsOption;
  constructor(
    private messagehandleservice: MessageHandleService
  ) {
    this.messagehandleservice.receiveMessage$.subscribe(
      (message) => {
        this.receiveMessage = message;
        this.showSuccess = !(this.receiveMessage.epoch < this.receiveMessage.all_epochs);
      }
    );

  }

  ngOnInit(): void {
    this.chartOption1 = {
      xAxis: {
        // data: [0, 1, 2]
        data: this.receiveMessage.epoch_arr
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        // data: [2, 4, 6],
        data: this.receiveMessage.cost_arr,
        type: 'line',
      }]
    }
    this.chartOption2 = {
      xAxis: {
        // data: [0, 1, 2]
        data: this.receiveMessage.epoch_arr
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        // data: [2, 4, 6],
        data: this.receiveMessage.loss_arr,
        type: 'line',
      }]
    }
  }
}
