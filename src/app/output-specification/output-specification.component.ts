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
    this.messagehandleservice.sendMessage$.subscribe(
      (message) => { this.FinishForm = message; }
    );
  }


}
