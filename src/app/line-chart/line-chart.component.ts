
import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


import { ApiServiceService } from '../shared/api-service.service';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STOCKS } from '../shared';

@Component({
  selector: 'app-line-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  
  dataX = STOCKS;
  private api = [];

  @ViewChild('container') element: ElementRef;

  title = 'Common Wealth Bank - Line Chart';

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private lineX = this.dataX

  constructor(private apiService : ApiServiceService ) {
    this.width = 750 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }


  ngOnInit() {
    this.apiService.getService()
    .subscribe((data) => { 
      this.api = data; 
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawLine();
    })


    this.svg = d3.select(this.element.nativeElement);
    
    

    const _this = this;
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: this.dataX.length,
      values: [ 0, this.dataX.length ],
      slide: function( event, ui ) {
        _this.svg.html('');
        _this.lineX = _this.dataX.slice(ui.values[ 0 ], ui.values[ 1 ]);
        _this.initSvg();
        _this.initAxis();
        _this.drawAxis();
        _this.drawLine();
        $( "#amount" ).val(ui.values[ 0 ] +'-'+ ui.values[ 1 ] );
      }
    });
  }
  private initSvg() {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }


  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.lineX, (d) => d.date));
    this.y.domain(d3Array.extent(this.lineX, (d) => d.value));
  }

  

  private drawAxis() {
    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    this.svg.append('path')
      .datum(this.lineX)
      .attr('class', 'line')
      .attr('d', this.line)
  }
}