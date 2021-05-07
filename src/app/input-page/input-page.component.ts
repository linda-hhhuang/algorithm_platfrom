import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
// import { from } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { MessageHandleService } from '../messagehandle.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.css']
})
export class InputPageComponent implements OnInit {

  index: number;
  items: MenuItem[];

  form: FormGroup;
  // payLoad = '';

  constructor(
    private dataservice: DataService,
    private messagehandleservice: MessageHandleService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Problem' },
      { label: 'Model' },
      { label: 'Algorithm' },
      { label: 'Train' },
      { label: 'Misc' }
    ];
    this.index = 0;
    this.form = this.dataservice.TotalForm;
  }

  handleChange(e): void {
    this.index = e.index;
  }
  handleSubmit(): void {
    if (!this.form.valid) {
      this.showLack();
    }
    else if (
      this.form.get('ModelForm').get('model').value.value === 'attention'
      &&
      this.form.get('ModelForm').get('embedding_dim').value %
      this.form.get('ModelForm').get('heads').value !== 0
    ) {
      this.showConflictHeaders();
    }
    else if (
      this.form.get('TrainForm').get('instances_per_epoch').value %
      this.form.get('TrainForm').get('instances_per_batch').value !== 0
    ) {
      this.showConflictIns();
    }
    else {
      this.showSuccess();
      // this.payLoad = JSON.stringify(this.form.getRawValue());
      this.messagehandleservice.send_message(this.form.getRawValue());
      this.router.navigate(['/output']);

    }
  }

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: '成功', detail: '已提交' });
  }
  showLack(): void {
    this.messageService.add({ severity: 'info', summary: '失败', detail: '还有参数未填写。' });
  }
  showConflictHeaders(): void {
    this.messageService.add({ severity: 'info', summary: '失败', detail: '参数embedding dim应该是参数heads的整数倍。' });
  }
  showConflictIns(): void {
    this.messageService.add({ severity: 'info', summary: '失败', detail: 'instances per epoch应为instances per batch的整数倍。' });
  }
}
