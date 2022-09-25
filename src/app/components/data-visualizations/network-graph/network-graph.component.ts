import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';
import { AppState } from 'src/app/state/app.state';
import { selectPeople } from 'src/app/state/people/people.selectors';

@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.scss'],
})
export class NetworkGraphComponent implements OnInit {
  public people$ = this.store.select(selectPeople);
  width: number = 320;
  height: number = 200;
  svg: any;
  tempData: any = {
    nodes: [
      { id: "Red Ranger" },
      { id: "Blue Ranger" },
      { id: "Yellow Ranger" },
      { id: "Green Ranger"},
      { id: "Pink Ranger"}
    ],
    links: [
      { source: "Red Ranger", target: "Blue Ranger" },
      { source: "Red Ranger", target: "Yellow Ranger" },
      { source: "Yellow Ranger", target: "Green Ranger" },
      { source: "Green Ranger", target: "Pink Ranger" }
    ],
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.svg = d3
      .select('#dataViz')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');
    this.createNetworkGraph(this.tempData);
  }

  hasKeys(obj: any = {}): Boolean {
    if (Object.keys(obj).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  createNetworkGraph(data: any): void {
    let link: any = this.svg
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .style('stroke', '#aaa');

    let node: any = this.svg
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      .style('fill', '#673ab7');

    let simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3
          .forceLink()
          .id((d: any) => {
            return d.id;
          })
          .links(data.links)
      )
      .force('charge', d3.forceManyBody().strength(-5))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .on('end', ticked);
    function ticked() {
      link
        .attr('x1', (d: any) => {
          return d.source.x;
        })
        .attr('y1', (d: any) => {
          return d.source.y;
        })
        .attr('x2', (d: any) => {
          return d.target.x;
        })
        .attr('y2', (d: any) => {
          return d.target.y;
        });

      node
        .attr('cx', (d: any) => {
          return d.x + 0.75;
        })
        .attr('cy', (d: any) => {
          return d.y - 0.75;
        });
    }
  }
}
