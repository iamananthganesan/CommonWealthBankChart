import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MatSliderModule } from '@angular/material'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
//import { ApiServiceService } from './shared/api-service.service';

import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    BubbleChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
