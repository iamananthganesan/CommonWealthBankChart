import { Component, ElementRef, Input, ViewChild, OnInit, OnChanges, AfterViewChecked } from '@angular/core';
import * as d3 from 'd3';

import { ApiServiceService } from '../shared/api-service.service';
import {BUBBLE} from "../shared"

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {

  title = "Common Wealth Bank - Bubble Chart ";
  constructor() { }

  ngOnInit() {

    var bubbleChart_json = BUBBLE;
    var diameter = 600,
      color = d3.scaleOrdinal(d3.schemeCategory20c);

    var colorScale = d3.scaleLinear()
      .domain([0, d3.max(bubbleChart_json.children, function (d) {
        return d.value;
      })])
      .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

    var bubble = d3.pack()
      .size([diameter, diameter])
      .padding(5);

    var margin = {
      left: 0,
      right: 100,
      top: 0,
      bottom: 0
    };

    var svg = d3.select('#chart').append('svg')
      .attr('viewBox', '0 0 ' + (diameter + margin.right) + ' ' + diameter)
      .attr('width', (diameter + margin.right))
      .attr('height', diameter)
      .attr('class', 'chart-svg');

    var root = d3.hierarchy(bubbleChart_json)
      .sum(function (d) { return d.value; })
      .sort(function (a, b) { return b.value - a.value; });

    bubble(root);

    var node = svg.selectAll('.node')
      .data(root.children)
      .enter()
      .append('g').attr('class', 'node')
      .attr('transform', function (d) { return 'translate(' + d.x + ' ' + d.y + ')'; })
      .append('g').attr('class', 'graph');

    node.append("circle")
      .attr("r", function (d) { return d.r; })
      .style("fill", function (d) {
        return color(d.data.name);
      });

    node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function (d) { return d.data.value; })
      .style("fill", "#ffffff")

    svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(600,40)")

  }
}
