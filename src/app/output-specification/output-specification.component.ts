import { Component, OnInit } from '@angular/core';
import { MessageHandleService } from '../messagehandle.service';
@Component({
  selector: 'app-output-specification',
  templateUrl: './output-specification.component.html',
  styleUrls: ['./output-specification.component.css']
})
export class OutputSpecificationComponent implements OnInit {

  FinishForm: any;
  constructor(
    private messagehandleservice: MessageHandleService
  ) { }
  ngOnInit() {
    // this.messagehandleservice.sendMessage$.subscribe(
    //   (message) => { this.FinishForm = message; }
    // );
    this.FinishForm = {
      problem: 'tsp',
      graph_size: 20,
      model: 'attention',
      embedding_dim: 128,
      hidden_dim: 128,
      n_encode_layers: 3,
      n_heads: 8,
      baseline: 'rollout',
      bl_alpha: 0.05,
      lr_model: 0.0001,
      lr_decay: 1,
      batch_size: 128,
      epoch_size: 128,
      n_epochs: 3,
      val_size: 10000,
      seed: 0,
      run_name: '123sdf',
      output_dir: 'outputs'
    };
  }


}
