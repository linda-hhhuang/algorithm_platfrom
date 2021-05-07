import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputPageComponent } from './input-page/input-page.component'
import { OutputPageComponent } from './output-page/output-page.component'

const routes: Routes = [
  { path: 'input', component: InputPageComponent },
  { path: 'output', component: OutputPageComponent },
  { path: '', redirectTo: '/input', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
