import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injectable,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';
import { NetworkGraphService } from 'src/app/services/network-graph/network-graph.service';
import { AppState } from 'src/app/state/app.state';
import {
  selectPeople,
  selectPeopleLoadStatus,
} from 'src/app/state/people/people.selectors';
import { Person } from '../../forms/person-form/person.model';
import { interval, Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Injectable()
export class UnsubscribeService implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  destroy(): Observable<void> {
    return this.destroy$.asObservable();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.scss'],
  providers: [UnsubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkGraphComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dataViz') $dataViz: ElementRef | undefined;
  public people$ = this.store.select(selectPeople);
  peopleLoadStatus$ = this.store.select(selectPeopleLoadStatus);
  status: string | null = null;
  graphMo: MutationObserver | undefined;
  showSpinner: Boolean = true;
  component = this;
  width: number = 320;
  height: number = 200;
  svg: any;
  graphData: any = { nodes: [], links: [] };

  constructor(
    private store: Store<AppState>,
    private _networkGraph: NetworkGraphService,
    private _unsubscribe: UnsubscribeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.peopleLoadStatusSubscribe();
    this.peopleSubscribe();
  }

  ngAfterViewInit(): void {
    this.graphMo = new MutationObserver(() => {
      if (this.status && this.status === 'success') {
        let $firstCircle =
          this.$dataViz?.nativeElement.getElementsByTagName('circle')[0];
        if ($firstCircle?.hasAttribute('cx')) {
          this.showSpinner = false;
          this.cd.detectChanges();
        }
      }
    });
    this.graphMo.observe(document.querySelector('#dataViz')!, {
      subtree: true,
      attributeFilter: ['cx'],
    });
  }

  peopleLoadStatusSubscribe(): void {
    this.peopleLoadStatus$
      .pipe(takeUntil(this._unsubscribe.destroy()))
      .subscribe((status: string | null) => {
        this.status = status;
        if (status !== 'success' && !this.showSpinner) {
          this.showSpinner = true;
        }
      });
  }

  peopleSubscribe(): void {
    this.people$
      .pipe(takeUntil(this._unsubscribe.destroy()))
      .subscribe((people: { [key: string]: Person }) => {
        if (this.$dataViz) {
          this.$dataViz.nativeElement.innerHTML = '';
        }
        this.graphData = { nodes: [], links: [] };
        for (const personKey in people) {
          this.graphData.nodes.push({
            id: people[personKey].id,
            name: people[personKey].name,
            weight: people[personKey].weight,
            age: people[personKey].age,
            nodeColor: people[personKey].nodeColor
          });
          for (const friendKey in people[personKey].friends) {
            this.graphData.links.push({
              source: people[personKey].id,
              target: people[friendKey].id,
            });
          }
        }
        this.svg = d3
          .select('#dataViz')
          .append('svg')
          .attr('width', this.width)
          .attr('height', this.height)
          .append('g');
        this.createNetworkGraph(this.graphData);
      });
  }

  hasKeys(obj: any = {}): Boolean {
    if (Object.keys(obj).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  nodeMouseOver(event: any, d: any): void {
    this._networkGraph.nodeMouseOver(event, d);
  }

  nodeMouseOut(): void {
    this._networkGraph.nodeMouseOut();
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
      .style('fill', function (d: any) {
          if (d.nodeColor) {
            return d.nodeColor;
          } else {
            return '#673ab7';
          }
      })
      .on('mouseover', (event: any, d: any) => {
        this.component.nodeMouseOver(event, d);
      })
      .on('mouseout', () => {
        this.component.nodeMouseOut();
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

  ngOnDestroy(): void {
    this.graphMo?.disconnect();
  }
}
