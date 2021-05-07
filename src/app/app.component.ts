import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  constructor(private primeNGConfig: PrimeNGConfig) {
  }
  ngOnInit() {
    this.primeNGConfig.ripple = true;
  }
}
