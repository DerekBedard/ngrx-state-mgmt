import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkGraphTooltipComponent } from './network-graph-tooltip.component';

describe('NetworkGraphTooltipComponent', () => {
  let component: NetworkGraphTooltipComponent;
  let fixture: ComponentFixture<NetworkGraphTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkGraphTooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkGraphTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
