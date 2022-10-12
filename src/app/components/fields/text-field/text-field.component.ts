import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFieldComponent implements OnInit {
  @Input() group: any;
  @Input() control: string = '';
  @Input() placeholder: string = '';
  @Input() readonly: BooleanInput = false;

  constructor() {}

  ngOnInit(): void {}
}
