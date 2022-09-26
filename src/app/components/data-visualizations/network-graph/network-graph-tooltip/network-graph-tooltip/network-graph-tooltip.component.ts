import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NetworkGraphService } from 'src/app/services/network-graph/network-graph.service';

@Component({
  selector: 'app-network-graph-tooltip',
  templateUrl: './network-graph-tooltip.component.html',
  styleUrls: ['./network-graph-tooltip.component.scss']
})
export class NetworkGraphTooltipComponent implements OnInit {
  @ViewChild('graphTooltipWrapper') $graphTooltipWrapper: ElementRef | undefined;
  showGraphTooltip: Boolean = false;
  tooltipHeaderTxt: string = "";
  tooltipContentTxt: string = "";

  constructor(
    private networkGraphService: NetworkGraphService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.startSubscriptions();
  }

  startSubscriptions(): void {
    this.nodeMouseOverStream();
    this.nodeMouseOutStream();
  }

  nodeMouseOverStream(): void {
    this.networkGraphService.nodeMouseOverStream().subscribe((response: any) => {
      if (response?.d?.name) {
        this.nodeMouseOver(response.event, response.d);
      }
    });
  }

  nodeMouseOutStream(): void {
    this.networkGraphService.nodeMouseOutStream().subscribe((response: any) => {
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
    }
  }

  nodeMouseOut(bool: Boolean): void {
    this.showGraphTooltip = bool;
  }

}
