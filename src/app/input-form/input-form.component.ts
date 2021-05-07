import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  @Input() index: number;

  private form: FormGroup;
  private problems;
  private problemForm: FormGroup;
  private models;
  private modelForm: FormGroup;

  private algorithmForm: FormGroup;
  private trainForm: FormGroup;
  private miscForm: FormGroup;
  private showEncodeLayers: boolean;
  private showHeads: boolean;
  private showHiddenDim: boolean;
  constructor(
    private dataservice: DataService
  ) {
  }

  ngOnInit(): void {
    this.form = this.dataservice.TotalForm;
    this.problems = this.dataservice.Problems;
    this.problemForm = this.form.get('ProblemForm') as FormGroup;
    this.models = this.dataservice.Models;
    this.modelForm = this.form.get('ModelForm') as FormGroup;
    this.algorithmForm = this.form.get('AlgorithmForm') as FormGroup;
    this.trainForm = this.form.get('TrainForm') as FormGroup;
    this.miscForm = this.form.get('MiscForm') as FormGroup;
    this.showEncodeLayers = true;
    this.showHeads = true;
    this.showHiddenDim = true;
    this.modelForm.get('model').valueChanges.subscribe(x => {
      if (x.value === 'pointer') {
        this.modelForm.get('hidden_dim').enable();
        this.modelForm.get('encode_layers').disable();
        this.modelForm.get('heads').disable();
      }
      else if (x.value === 'attention') {
        this.modelForm.get('hidden_dim').disable();
        this.modelForm.get('encode_layers').enable();
        this.modelForm.get('heads').enable();
      }
    });
  }


}
