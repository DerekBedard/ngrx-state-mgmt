import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';
import { AppState } from 'src/app/state/app.state';
import { selectPeople, selectPeopleLoadStatus } from 'src/app/state/people/people.selectors';
import { Person } from '../../forms/person-form/person.model';

@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.scss'],
})
export class NetworkGraphComponent implements OnInit {
  @ViewChild('dataViz') $dataViz: ElementRef | undefined;
  public people$ = this.store.select(selectPeople);
  public peopleLoadStatus$ = this.store.select(selectPeopleLoadStatus);
  width: number = 320;
  height: number = 200;
  svg: any;
  graphData: any = { nodes: [], links: [] };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.peopleSubscribe();
  }

  peopleSubscribe(): void {
    this.people$.subscribe((people: { [key: string]: Person }) => {
      if (this.$dataViz) {
        this.$dataViz.nativeElement.innerHTML = "";
      }
      this.graphData= { nodes: [], links: [] };
      for (const personKey in people) {
        this.graphData.nodes.push({ id: people[personKey].name });
        for (const friendKey in people[personKey].friends) {
          this.graphData.links.push({ source: people[personKey].name, target: people[friendKey].name });
        }
      }
      this.svg = d3
      .select('#dataViz')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');
      this.createNetworkGraph(this.graphData);
    })
  }

  hasKeys(obj: any = {}): Boolean {
    if (Object.keys(obj).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  showSpinner(status: string | null): Boolean {
    if (status && status === "success") {
      if (this.$dataViz) {
        let firstCircle = this.$dataViz.nativeElement.getElementsByTagName('circle')[0];
        if (firstCircle.hasAttribute("cx")) {
          return false;
        }
      }
    }
    return true;
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
      .style('fill', function(d: any) {
        if (d.id.includes("Red")) {
          return "red";
        }
        if (d.id.includes("Blue")) {
          return "blue";
        }
        if (d.id.includes("Green")) {
          return "green";
        }
        if (d.id.includes("Pink")) {
          return "pink";
        }
        return '#673ab7';
      });

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
