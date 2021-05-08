import { Component, OnInit } from '@angular/core';
import { MessageHandleService } from '../messagehandle.service';
import { EChartsOption } from 'echarts';
import { RecvType } from '../messagehandle.entity';
@Component({
  selector: 'app-output-result',
  templateUrl: './output-result.component.html',
  styleUrls: ['./output-result.component.css']
})
export class OutputResultComponent implements OnInit {

  receiveMessage: RecvType;
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
        if (this.showSuccess) {
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
          };
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
          };
        }

      }
    );
  }

  ngOnInit(): void {
    this.chartOption1 = {
      xAxis: {
        data: [0]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [0],
        type: 'line',
      }]
    };
    this.chartOption2 = {
      xAxis: {
        data: [0]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [0],
        type: 'line',
      }]
    };
    this.showSuccess = false;
    this.receiveMessage = {
      all_epochs: 0,
      all_time: '',
      avg_cost: 0.0,
      batch_arr: [],
      cost_arr: [],
      epoch: 0,
      epoch_arr: [],
      loss_arr: [],
      lr: 0.0,
      run_name: '',
      std_cost: 0.0
    };
  }
}
