import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  TotalForm = this.fb.group({
    ProblemForm: this.fb.group({
      problem: ['', Validators.required],
      graph_size: [20, Validators.required],
    }),
    ModelForm: this.fb.group({
      model: ['', Validators.required],
      embedding_dim: [128, Validators.required],
      hidden_dim: [128, Validators.required],
      encode_layers: [3, Validators.required],
      heads: [8, Validators.required],
    }),
    AlgorithmForm: this.fb.group({
      algorithm: ['Self Critic', Validators.required],
      baseline_alpha: [0.05, Validators.required],
    }),
    TrainForm: this.fb.group({
      learning_rate: [0.0001, Validators.required],
      learning_rate_dacay: [1, Validators.required],
      instances_per_batch: [128, Validators.required],
      instances_per_epoch: [128, Validators.required],
      epochs: [3, Validators.required],
      instance_per_validation: [10000, Validators.required],
      seed: [0, Validators.required],
    }),
    MiscForm: this.fb.group({
      run_name: ['', Validators.required],
      output_dir: ['outputs', Validators.required],
    })
  });

  Problems = [
    { name: 'TSP', value: 'tsp' },
    { name: 'CVRP', value: 'cvrp' },
    { name: 'OP', value: 'op' },
    { name: 'PCTSP', value: 'pctsp_det' },
  ];

  Models = [
    { name: 'Attention', value: 'attention' },
    { name: 'Pointer Network', value: 'pointer' },
  ];

  constructor(private fb: FormBuilder) { }
}
