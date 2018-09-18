
import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import * as d3 from 'd3';
import { STOCKS } from '../shared';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    let jsonData = [
      {
        "date": "Jan 2000",
        "price": 1394.46
      },
      {
        "date": "Feb 2000",
        "price": 1066.42
      },
      {
        "date": "Mar 2000",
        "price": 1698.58
      },
      {
        "date": "Apr 2000",
        "price": 152.43
      },
      {
        "date": "May 2000",
        "price": 2020.6
      },
      {
        "date": "Jun 2000",
        "price": 5454.6
      },
      {
        "date": "Jul 2000",
        "price": 430.83
      },
      {
        "date": "Aug 2000",
        "price": 2517.68
      }];

    this.loadChart(jsonData);
  }
  loadChart(data) {
    var svg = d3.select("svg"),
      margin = { top: 20, right: 20, bottom: 110, left: 40 },
      margin2 = { top: 430, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      height2 = +svg.attr("height") - margin2.top - margin2.bottom;
    let parseDate = d3.timeParse("%b %Y");
    data.forEach(function (d) {
      d.date = parseDate(d.date);
      d.price = +d.price;
    });

    var x = d3.scaleTime().range([0, width]),
      x2 = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      y2 = d3.scaleLinear().range([height2, 0]);

    var xAxis = d3.axisBottom(x),
      xAxis2 = d3.axisBottom(x2),
      yAxis = d3.axisLeft(y);

    var brush = d3.brushX()
      .extent([[0, 0], [width, height2]])
      .on("brush end", brushed);

    var area = d3.area()
      .curve(d3.curveLinear)
      .x(function (d) { return x(d.date); })
      .y0(height)
      .y1(function (d) { return y(d.price); });

    var area2 = d3.area()
      .curve(d3.curveLinear)
      .x(function (d) { return x2(d.date); })
      .y0(height2)
      .y1(function (d) { return y2(d.price); });

    svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    let focus = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
    //if (error) throw error;

    x.domain(d3.extent(data, function (d) { return d.date; }));
    y.domain([0, d3.max(data, function (d) { return d.price; })]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    focus.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

    focus.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    focus.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);

    context.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area2);

    context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

    context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, x.range());

    focus.append("g").selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "nodeCircle")
      .attr("r", 3)
      .attr("cx", function (dd) { return x(dd.date) })
      .attr("cy", function (dd) { return y(dd.price) })
      .attr("fill", "white")
      .attr("stroke", "steelblue")
    // add the X gridlines
    focus.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat("")
      )

    // add the Y gridlines
    focus.append("g")
      .attr("class", "grid")

      .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
      )
    
    function brushed() {
        
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
      var s = d3.event.selection || x2.range();
      x.domain(s.map(x2.invert, x2));
      focus.select(".area").attr("d", area);
      focus.select(".axis--x").call(xAxis);      
    }

    function zoomed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
      var t = d3.event.transform;
      x.domain(t.rescaleX(x2).domain());
      focus.select(".area").attr("d", area);
      focus.select(".axis--x").call(xAxis);
      context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
    }


    function type(d) {

      d.date = parseDate(d.date);
      d.price = +d.price;
      return d;
    }

    function make_x_gridlines() {
      return d3.axisBottom(x)
        .ticks(5)
    }

    // gridlines in y axis function
    function make_y_gridlines() {
      return d3.axisLeft(y)
        .ticks(5)
    }

  }

}
