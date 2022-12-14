import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberFieldComponent implements OnInit {
  @Input() group: any;
  @Input() control: string = '';
  @Input() placeholder: string = '';
  @Input() minErrMsg: string = '';
  @Input() maxErrMsg: string = '';

  constructor() { }

  ngOnInit(): void {}

}
