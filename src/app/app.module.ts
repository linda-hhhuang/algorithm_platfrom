import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { InputSpecificationComponent } from './input-specification/input-specification.component';
import { OutputSpecificationComponent } from './output-specification/output-specification.component';
import { OutputResultComponent } from './ouput-result/output-result.component';
import { OutputPageComponent } from './output-page/output-page.component';
import { InputPageComponent } from './input-page/input-page.component';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms'; import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

import { DataService } from './data.service';
import { MessageHandleService } from './messagehandle.service';
import { MessageService } from 'primeng/api';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    InputSpecificationComponent,
    OutputSpecificationComponent,
    OutputResultComponent,
    OutputPageComponent,
    InputPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    SplitterModule,
    TabMenuModule,
    TabViewModule,
    ScrollPanelModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    BrowserAnimationsModule,
    ToastModule,
    RippleModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [DataService, FormBuilder, MessageHandleService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
