import { Component, AfterViewInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';
import { scaleOrdinal } from 'd3-scale';
import {arc, pie} from 'd3-shape';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
constructor(
  public service: DataService
  ) {}
  ngAfterViewInit(): void {
    if (this.service.dataSource.datasets[0].data.length === 0){
    this.service.getBudget();
    }
    setTimeout(() => {

      this.createChart();
      this.createD3js();
    }, 500);
  }
  // tslint:disable-next-line: typedef
  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.service.dataSource
    });
}

  // tslint:disable-next-line: typedef
  createD3js(){
    const width = 650;
    const height = 700;
    const margin = 150;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select('#d3js')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const color = scaleOrdinal()
      .domain(this.service.d3jsl)
      .range(['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19', '#46b535', '#05e2f1', '#552bec']);

    const ring = pie()
      .sort(null)
      .value((d: any) => d.value);

    const dataReady = ring(d3.entries(this.service.d3jsd));

    const angle = arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);
    const outerArc = arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.8);
    svg
      .selectAll('allSlices')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', angle)
      .attr('fill', (d: any) => (color(d.data.key)))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 1);
    svg
      .selectAll('allPolyLines')
      .data(dataReady)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', (d: any) => {
      const posA = angle.centroid(d);
      const posB = outerArc.centroid(d);
      const posC = outerArc.centroid(d);
      const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      posC[0] = radius * 0.97 * (midAngle < Math.PI ? 1 : -1);
      return [posA, posB, posC];
      });

    svg
      .selectAll('allLabels')
      .data(dataReady)
      .enter()
      .append('text')
      .text( (d: any) => (d.data.key + '( $' + d.data.value + ' )' ) )
      .attr('transform', (d: any) => {
          const pos = outerArc.centroid(d);
          const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          pos[0] = radius * 1.1 * (midAngle < Math.PI ? 1 : -1);
          return 'translate(' + pos + ')';
      })
      .style('text-anchor', (d: any) => {
          const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return (midAngle < Math.PI ? 'start' : 'end');
      });
  }

}
