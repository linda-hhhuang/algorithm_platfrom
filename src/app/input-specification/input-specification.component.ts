import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-specification',
  templateUrl: './input-specification.component.html',
  styleUrls: ['./input-specification.component.css']
})
export class InputSpecificationComponent implements OnInit {
  @Input() index: number;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
