import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Injectable, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { NetworkGraphService } from 'src/app/services/network-graph/network-graph.service';

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
  selector: 'app-network-graph-tooltip',
  templateUrl: './network-graph-tooltip.component.html',
  styleUrls: ['./network-graph-tooltip.component.scss'],
  providers: [UnsubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkGraphTooltipComponent implements OnInit {
  @ViewChild('graphTooltipWrapper') $graphTooltipWrapper: ElementRef | undefined;
  showGraphTooltip: Boolean = false;
  tooltipHeaderTxt: string = "";
  tooltipContentTxt: string = "";

  constructor(
    private _networkGraph: NetworkGraphService,
    private _unsubscribe: UnsubscribeService,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.startSubscriptions();
  }

  startSubscriptions(): void {
    this.nodeMouseOverStream();
    this.nodeMouseOutStream();
  }

  nodeMouseOverStream(): void {
    this._networkGraph.nodeMouseOverStream()
    .pipe(takeUntil(this._unsubscribe.destroy()))
    .subscribe((response: any) => {
      if (response?.d?.name) {
        this.nodeMouseOver(response.event, response.d);
      }
    });
  }

  nodeMouseOutStream(): void {
    this._networkGraph.nodeMouseOutStream()
    .pipe(takeUntil(this._unsubscribe.destroy()))
    .subscribe((response: any) => {
      this.nodeMouseOut(response);
    });
  }

  nodeMouseOver(event: any, d: any): void {
    if (this.$graphTooltipWrapper) {
      this.tooltipHeaderTxt = d.name;
      this.tooltipContentTxt = d.age + " yr. old, " + d.weight + " lbs.";
      this.renderer.setStyle(this.$graphTooltipWrapper.nativeElement, 'top', event.pageY + 'px');
      this.renderer.setStyle(this.$graphTooltipWrapper.nativeElement, 'left', event.pageX + 'px');
      this.showGraphTooltip = true;
      this.cd.detectChanges();
    }
  }

  nodeMouseOut(bool: Boolean): void {
    this.showGraphTooltip = bool;
    this.cd.detectChanges();
  }

}
